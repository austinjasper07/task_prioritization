from django.core.management.base import BaseCommand
import pandas as pd
import joblib
import os
from django.conf import settings
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class Command(BaseCommand):
    help = 'Train prioritization decision tree model'

    def add_arguments(self, parser):
        parser.add_argument('--input', type=str, required=True, help='CSV input with labeled tasks')

    def handle(self, *args, **options):
        df = pd.read_csv(options['input'])
        X = df[['deadline_days','importance','urgency_flag','estimated_hours','dependencies','value_score','blocked','owner_load','category']]
        y = df['priority_label']

        cat_cols = ['category']
        num_bool = ['deadline_days','importance','urgency_flag','estimated_hours','dependencies','value_score','blocked','owner_load']

        pre = ColumnTransformer([
            ('num', 'passthrough', num_bool),
            ('cat', OneHotEncoder(handle_unknown='ignore'), cat_cols)
        ])

        clf = Pipeline([
            ('pre', pre),
            ('tree', DecisionTreeClassifier(criterion='entropy', max_depth=6, min_samples_leaf=20, random_state=42))
        ])

        X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)
        clf.fit(X_train, y_train)

        model_path = os.path.join(settings.BASE_DIR, 'model.pkl')
        joblib.dump(clf, model_path)
        self.stdout.write(self.style.SUCCESS(f'Model trained and saved to {model_path}'))
