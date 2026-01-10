#!/usr/bin/env python3
"""Check Firebase database structure"""

import firebase_admin
from firebase_admin import credentials, db
import json

# Initialize Firebase
if not firebase_admin._apps:
    cred = credentials.Certificate('serviceAccountKey.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://delhibreathe-default-rtdb.firebaseio.com'
    })

print("\n" + "="*60)
print("  Firebase Database Structure")
print("="*60 + "\n")

# Get root data
ref = db.reference('/')
data = ref.get()

if data:
    print("✅ Firebase connected successfully!\n")
    print("📊 Database structure:")
    print(json.dumps(data, indent=2, default=str)[:2000])  # First 2000 chars
    print("\n" + "="*60)
    print(f"Top-level keys: {list(data.keys()) if isinstance(data, dict) else 'Not a dict'}")
    print("="*60 + "\n")
else:
    print("❌ No data found in Firebase database")
