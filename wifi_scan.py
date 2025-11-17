import network

def scan_networks():
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)

    networks = wlan.scan()
    results = []

    for ssid, bssid, channel, rssi, authmode, hidden in networks:
        security_types = {
            0: "OPEN",
            1: "WEP",
            2: "WPA-PSK",
            3: "WPA2-PSK",
            4: "WPA/WPA2-PSK",
        }

        security = security_types.get(authmode, "UNKNOWN")

        results.append({
            "ssid": ssid.decode(),
            "mac": ':'.join('%02x' % b for b in bssid),
            "rssi": rssi,
            "security": security
        })

    return results


# PRUEBA
if __name__ == "__main__":
    nets = scan_networks()
    for n in nets:
        print(n)
