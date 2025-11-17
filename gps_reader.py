import machine
import utime

uart = machine.UART(1, baudrate=9600, tx=machine.Pin(4), rx=machine.Pin(5))

def parse_gpgga(sentence):
    parts = sentence.split(",")

    if len(parts) < 6:
        return None

    fix = parts[6]   # "1" = fix válido, "0" = sin señal
    if fix == "0":
        return None

    lat = parts[2]
    lat_dir = parts[3]
    lon = parts[4]
    lon_dir = parts[5]

    def convert(coord, direction):
        if coord == "":
            return None
        deg = float(coord[:2])
        minutes = float(coord[2:])
        decimal = deg + minutes / 60
        if direction in ["S", "W"]:
            decimal *= -1
        return decimal

    return {
        "lat": convert(lat, lat_dir),
        "lon": convert(lon, lon_dir),
        "fix": True
    }


def get_gps_data():
    if uart.any():
        line = uart.readline()
        try:
            line = line.decode("utf-8")
            if "$GPGGA" in line:
                return parse_gpgga(line)
        except:
            return None
    return None


# PRUEBA
if __name__ == "__main__":
    while True:
        data = get_gps_data()
        if data:
            print("GPS:", data)
        else:
            print("Sin señal GPS...")
        utime.sleep(1)
