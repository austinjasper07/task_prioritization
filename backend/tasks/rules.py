from datetime import datetime, timezone

def apply_rules(task):
    now = datetime.now(timezone.utc)
    reason_parts = []

    delta = (task.deadline - now).days if task.deadline else 9999

    if delta <= 0 or task.urgency_flag:
        reason_parts.append('Overdue or marked urgent')
        return 'High', 0.9, '; '.join(reason_parts)

    if delta <= 2 and task.importance >= 4:
        reason_parts.append(f'Deadline in {delta} days and importance {task.importance}')
        return 'High', 0.8, '; '.join(reason_parts)

    if task.blocked and task.dependencies > 0:
        reason_parts.append('Blocked by dependencies')
        return 'Medium', 0.6, '; '.join(reason_parts)

    if task.estimated_hours >= 8 and task.owner_load >= 30:
        reason_parts.append('Large work and owner busy')
        return 'Medium', 0.5, '; '.join(reason_parts)

    if task.value_score >= 8 and task.importance >= 3:
        reason_parts.append('High business value')
        return 'High', 0.75, '; '.join(reason_parts)

    if task.importance <= 1 and delta > 14:
        reason_parts.append('Low importance, not close')
        return 'Low', 0.7, '; '.join(reason_parts)

    reason_parts.append('Default mid priority')
    return 'Medium', 0.5, '; '.join(reason_parts)
