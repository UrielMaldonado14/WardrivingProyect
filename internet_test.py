import network
import time
import urequests

def connect_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)

    for _ in range(10):
        if wlan.isconnected():
            print("Conectado a internet")
            print(wlan.ifconfig())
            return True
        time.sleep(1)

    print("No se pudo conectar")
    return False


def test_ping():
    try:
        r = urequests.get("http://google.com")
        print("Internet OK")
        r.close()
        return True
    except:
        print("Sin internet")
        return False


# PRUEBA
if __name__ == "__main__":
    connect_wifi("TuHotspot", "password123")
    test_ping()
