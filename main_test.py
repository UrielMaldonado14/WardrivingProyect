import time
from wifi_scan import scan_networks
from gps_reader import get_gps_data
from storage import save_offline

print("Iniciando pruebas del sistema...")

while True:
    gps = get_gps_data()
    if gps:
        print("GPS OK:", gps)
    else:
        print("Esperando señal GPS...")
        time.sleep(1)
        continue

    networks = scan_networks()
    print("Redes detectadas:", len(networks))

    data = {
        "gps": gps,
        "wifi": networks,
        "timestamp": time.time()
    }

    print("Guardando localmente...")
    save_offline(data)

    time.sleep(10)
