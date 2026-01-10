const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create Stripe Checkout Session
 * Handles pre-order checkout with shipping address collection
 */
exports.createCheckoutSession = onRequest({ cors: true }, async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { amount, currency, shippingDetails } = req.body;

        logger.info("Creating checkout session", { amount, currency });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency || 'inr',
                        product_data: {
                            name: 'Eco Breathe',
                            description: 'Advanced Air Purification & Monitoring System',
                            images: ['https://via.placeholder.com/600x600/10b981/ffffff?text=Eco+Breathe'],
                        },
                        unit_amount: (amount || 999) * 100, // Convert to paise/cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin || 'http://localhost:5173'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin || 'http://localhost:5173'}/checkout`,
            customer_email: shippingDetails?.email,
            shipping_address_collection: {
                allowed_countries: ['IN'], // India only
            },
            metadata: {
                fullName: shippingDetails?.fullName || '',
                phone: shippingDetails?.phone || '',
                address: shippingDetails?.address || '',
                city: shippingDetails?.city || '',
                state: shippingDetails?.state || '',
                pincode: shippingDetails?.pincode || '',
                landmark: shippingDetails?.landmark || '',
            },
        });

        logger.info("Checkout session created", { sessionId: session.id });

        res.json({
            id: session.id,
            url: session.url
        });
    } catch (error) {
        logger.error("Error creating checkout session:", error);
        res.status(500).json({
            error: error.message
        });
    }
});

/**
 * Webhook to handle successful payments
 * Stores order information in Firebase
 */
exports.stripeWebhook = onRequest({ cors: false }, async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    } catch (err) {
        logger.error('Webhook signature verification failed:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        logger.info('Payment successful:', session.id);

        // Store order in Firebase
        const admin = require('firebase-admin');
        const ordersRef = admin.database().ref('orders');
        
        await ordersRef.push({
            sessionId: session.id,
            amount: session.amount_total / 100,
            currency: session.currency,
            customerEmail: session.customer_email,
            shippingDetails: session.metadata,
            paymentStatus: session.payment_status,
            createdAt: Date.now(),
        });

        logger.info('Order stored in database');
    }

    res.json({ received: true });
});
