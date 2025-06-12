import random
from datetime import datetime, timedelta

# ================= CẤU HÌNH ====================
total_orders = 1000000         # Số lượng đơn hàng cần sinh
batch_size = 1000              # Số bản ghi mỗi batch INSERT
output_file = "orders_output.sql"  # Tên file xuất ra
customer_id_range = (1, 1000000)
staff_id_range = (1, 1000000)
status_list = ['CREATED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED', 'CANCELLED']

# ============== HÀM TẠO DỮ LIỆU ==============
def random_phone():
    return f"09{random.randint(10000000, 99999999)}"

def random_size():
    return f"{random.randint(10, 99)}x{random.randint(10, 99)}x{random.randint(10, 99)}"

def random_date():
    days_ago = random.randint(0, 365)
    date = datetime.now() - timedelta(days=days_ago)
    return date.strftime('%Y-%m-%d %H:%M:%S')

def generate_insert_batch(start_id, count):
    values = []
    for i in range(start_id, start_id + count):
        order_code = f"ORD{str(i).zfill(8)}"
        receiver_name = f"Receiver {i}"
        receiver_phone = random_phone()
        receiver_address = f"Receiver Address {i}"
        description = "Giao hàng tiêu chuẩn"
        weight = round(random.uniform(0.5, 20.0), 2)
        size = random_size()
        pickup_address = f"Pickup Point {i}"
        delivery_address = f"Delivery Point {i}"
        note = "Lưu ý giao hàng cẩn thận"
        customer_id = random.randint(*customer_id_range)
        staff_id = random.randint(*staff_id_range)
        status = random.choice(status_list)
        created_at = random_date()
        updated_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        values.append(f"('{order_code}', '{receiver_name}', '{receiver_phone}', '{receiver_address}', "
                      f"'{description}', {weight}, '{size}', '{pickup_address}', '{delivery_address}', "
                      f"'{note}', {customer_id}, {staff_id}, '{status}', '{created_at}', '{updated_at}')")
    return f"INSERT INTO orders (order_code, receiver_name, receiver_phone, receiver_address, description, weight, size, pickup_address, delivery_address, note, customer_id, staff_id, status, created_at, updated_at)\nVALUES\n" + ",\n".join(values) + ";\n"

# ============== GHI RA FILE SQL ==============
with open(output_file, "w") as f:
    f.write("-- SQL script to insert orders\n")
    f.write("SET FOREIGN_KEY_CHECKS = 0;\n\n")
    for start in range(1, total_orders + 1, batch_size):
        f.write(generate_insert_batch(start, min(batch_size, total_orders - start + 1)))
        f.write("\n")
    f.write("SET FOREIGN_KEY_CHECKS = 1;\n")

print(f"✅ File SQL đã được sinh: {output_file}")
