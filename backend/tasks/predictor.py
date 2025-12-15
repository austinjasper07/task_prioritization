import os
import joblib
import numpy as np
from .rules import apply_rules
from django.conf import settings
import pandas as pd

MODEL_PATH = os.path.join(settings.BASE_DIR, 'model.pkl')
_model = None

def load_model():
    global _model
    if _model is None and os.path.exists(MODEL_PATH):
        _model = joblib.load(MODEL_PATH)
    return _model

def task_to_features(task):
    from datetime import datetime, timezone
    now = datetime.now(timezone.utc)
    deadline_days = (task.deadline - now).days if task.deadline else 9999
    return {
        'deadline_days': deadline_days,
        'importance': task.importance,
        'urgency_flag': 1 if task.urgency_flag else 0,
        'estimated_hours': task.estimated_hours,
        'dependencies': task.dependencies,
        'value_score': task.value_score,
        'blocked': 1 if task.blocked else 0,
        'owner_load': task.owner_load,
        'category': task.category,
    }

def predict_task(task):
    model = load_model()
    features = task_to_features(task)
    if model is None:
        return apply_rules(task)

    df = pd.DataFrame([features])
    try:
        proba = model.predict_proba(df)[0]
        classes = model.classes_
        idx = np.argmax(proba)
        label = classes[idx]
        confidence = float(proba[idx])
        reason = f'Model prediction (prob {confidence:.2f})'
        if confidence < 0.6:
            rule_label, rule_reason, rule_conf = apply_rules(task)
            reason += f'; fallback rules used (rule: {rule_label})'
        return label, confidence, reason
    except:
        return apply_rules(task)
