import ujson

FILE = "offline_data.json"

def save_offline(data):
    try:
        stored = load_offline()
    except:
        stored = []

    stored.append(data)

    with open(FILE, "w") as f:
        f.write(ujson.dumps(stored))


def load_offline():
    with open(FILE, "r") as f:
        return ujson.loads(f.read())


def clear_storage():
    with open(FILE, "w") as f:
        f.write("[]")
