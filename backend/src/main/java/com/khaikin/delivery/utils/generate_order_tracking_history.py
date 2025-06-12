import random
from datetime import datetime, timedelta

# ================ CẤU HÌNH ===================
total_rows = 5000000
batch_size = 1000
output_file = "order_tracking_history.sql"
order_id_range = (1, 5000000)
status_list = ['CREATED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED', 'CANCELLED']

# ============== HÀM TẠO DỮ LIỆU ==============
def random_date():
    days_ago = random.randint(0, 365)
    date = datetime.now() - timedelta(days=days_ago)
    return date.strftime('%Y-%m-%d %H:%M:%S')

def generate_insert_batch(start_idx, count):
    values = []
    for _ in range(count):
        order_id = random.randint(*order_id_range)
        status = random.choice(status_list)
        changed_at = random_date()
        changed_by = f"system_user_{random.randint(1, 1000000)}"
        values.append(f"({order_id}, '{status}', '{changed_at}', '{changed_by}')")
    return f"INSERT INTO order_tracking_history (order_id, status, changed_at, changed_by)\nVALUES\n" + ",\n".join(values) + ";\n"

# ============== GHI RA FILE SQL ==============
with open(output_file, "w") as f:
    f.write("-- SQL script to insert order tracking history\n")
    f.write("SET FOREIGN_KEY_CHECKS = 0;\n\n")
    for start in range(1, total_rows + 1, batch_size):
        count = min(batch_size, total_rows - start + 1)
        f.write(generate_insert_batch(start, count))
        f.write("\n")
    f.write("SET FOREIGN_KEY_CHECKS = 1;\n")

print(f"✅ File SQL đã được sinh: {output_file}")
