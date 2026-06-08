/**
 * THY Route — Airport directory.
 *
 * A curated list of Turkish Airlines destinations grouped by city.
 * Each `city` entry may have one or more airports — Istanbul has IST
 * (main hub) and SAW (Sabiha Gökçen), Tokyo has HND and NRT, etc.
 *
 * The Home page autocomplete searches across city + airport name + IATA
 * code, so typing "ist" → İstanbul (both IST and SAW are shown).
 *
 * Source: THY's destination map + Wikipedia destination lists, hand-edited
 * for Turkish naming conventions ("Münih" not "München", "Viyana" not
 * "Wien" — match the THY booking site).
 */

const AIRPORTS = [
  /* ---------- Turkey (domestic) ---------- */
  { city: 'İstanbul', country: 'Türkiye', code: 'IST', name: 'İstanbul Havalimanı',                lat: 41.275, lon: 28.751 },
  { city: 'İstanbul', country: 'Türkiye', code: 'SAW', name: 'Sabiha Gökçen Uluslararası',         lat: 40.898, lon: 29.309 },
  { city: 'Ankara',   country: 'Türkiye', code: 'ESB', name: 'Esenboğa Havalimanı',                lat: 40.128, lon: 32.995 },
  { city: 'İzmir',    country: 'Türkiye', code: 'ADB', name: 'Adnan Menderes Havalimanı',           lat: 38.292, lon: 27.156 },
  { city: 'Antalya',  country: 'Türkiye', code: 'AYT', name: 'Antalya Havalimanı',                  lat: 36.898, lon: 30.800 },
  { city: 'Adana',    country: 'Türkiye', code: 'ADA', name: 'Şakirpaşa Havalimanı',                lat: 36.982, lon: 35.280 },
  { city: 'Bodrum',   country: 'Türkiye', code: 'BJV', name: 'Milas-Bodrum Havalimanı',             lat: 37.250, lon: 27.664 },
  { city: 'Dalaman',  country: 'Türkiye', code: 'DLM', name: 'Dalaman Havalimanı',                  lat: 36.713, lon: 28.792 },
  { city: 'Diyarbakır', country: 'Türkiye', code: 'DIY', name: 'Diyarbakır Havalimanı',            lat: 37.894, lon: 40.201 },
  { city: 'Erzurum',  country: 'Türkiye', code: 'ERZ', name: 'Erzurum Havalimanı',                  lat: 39.957, lon: 41.170 },
  { city: 'Gaziantep',country: 'Türkiye', code: 'GZT', name: 'Oğuzeli Havalimanı',                  lat: 36.947, lon: 37.479 },
  { city: 'Hatay',    country: 'Türkiye', code: 'HTY', name: 'Hatay Havalimanı',                    lat: 36.363, lon: 36.282 },
  { city: 'Kayseri',  country: 'Türkiye', code: 'ASR', name: 'Erkilet Havalimanı',                  lat: 38.770, lon: 35.495 },
  { city: 'Konya',    country: 'Türkiye', code: 'KYA', name: 'Konya Havalimanı',                    lat: 37.979, lon: 32.561 },
  { city: 'Malatya',  country: 'Türkiye', code: 'MLX', name: 'Erhaç Havalimanı',                    lat: 38.435, lon: 38.090 },
  { city: 'Samsun',   country: 'Türkiye', code: 'SZF', name: 'Çarşamba Havalimanı',                 lat: 41.254, lon: 36.567 },
  { city: 'Trabzon',  country: 'Türkiye', code: 'TZX', name: 'Trabzon Havalimanı',                  lat: 40.995, lon: 39.789 },
  { city: 'Van',      country: 'Türkiye', code: 'VAN', name: 'Ferit Melen Havalimanı',              lat: 38.468, lon: 43.332 },
  { city: 'Şanlıurfa',country: 'Türkiye', code: 'GNY', name: 'GAP Havalimanı',                      lat: 37.446, lon: 38.896 },
  { city: 'Sivas',    country: 'Türkiye', code: 'VAS', name: 'Nuri Demirağ Havalimanı',             lat: 39.814, lon: 36.903 },

  /* ---------- Europe ---------- */
  { city: 'Roma',     country: 'İtalya', code: 'FCO', name: 'Fiumicino - Leonardo da Vinci',        lat: 41.804, lon: 12.252 },
  { city: 'Milano',   country: 'İtalya', code: 'MXP', name: 'Malpensa Havalimanı',                  lat: 45.630, lon: 8.728 },
  { city: 'Venedik',  country: 'İtalya', code: 'VCE', name: 'Marco Polo Havalimanı',                lat: 45.505, lon: 12.351 },
  { city: 'Napoli',   country: 'İtalya', code: 'NAP', name: 'Capodichino Havalimanı',               lat: 40.886, lon: 14.290 },
  { city: 'Paris',    country: 'Fransa', code: 'CDG', name: 'Charles de Gaulle Havalimanı',         lat: 49.012, lon: 2.550 },
  { city: 'Paris',    country: 'Fransa', code: 'ORY', name: 'Orly Havalimanı',                      lat: 48.726, lon: 2.365 },
  { city: 'Nis',      country: 'Fransa', code: 'NCE', name: 'Côte d\'Azur Havalimanı',              lat: 43.659, lon: 7.215 },
  { city: 'Lyon',     country: 'Fransa', code: 'LYS', name: 'Saint-Exupéry Havalimanı',             lat: 45.726, lon: 5.090 },
  { city: 'Londra',   country: 'Birleşik Krallık', code: 'LHR', name: 'Heathrow Havalimanı',        lat: 51.470, lon: -0.454 },
  { city: 'Londra',   country: 'Birleşik Krallık', code: 'STN', name: 'Stansted Havalimanı',        lat: 51.885, lon: 0.235 },
  { city: 'Londra',   country: 'Birleşik Krallık', code: 'LGW', name: 'Gatwick Havalimanı',         lat: 51.148, lon: -0.190 },
  { city: 'Manchester',country:'Birleşik Krallık', code: 'MAN', name: 'Manchester Havalimanı',      lat: 53.354, lon: -2.275 },
  { city: 'Edinburgh',country: 'Birleşik Krallık', code: 'EDI', name: 'Edinburgh Havalimanı',       lat: 55.950, lon: -3.372 },
  { city: 'Dublin',   country: 'İrlanda', code: 'DUB', name: 'Dublin Havalimanı',                   lat: 53.421, lon: -6.270 },
  { city: 'Madrid',   country: 'İspanya', code: 'MAD', name: 'Barajas Havalimanı',                  lat: 40.471, lon: -3.567 },
  { city: 'Barselona',country: 'İspanya', code: 'BCN', name: 'El Prat Havalimanı',                  lat: 41.297, lon: 2.078 },
  { city: 'Malaga',   country: 'İspanya', code: 'AGP', name: 'Malaga Havalimanı',                   lat: 36.675, lon: -4.499 },
  { city: 'Lizbon',   country: 'Portekiz', code: 'LIS', name: 'Humberto Delgado Havalimanı',        lat: 38.781, lon: -9.135 },
  { city: 'Amsterdam',country: 'Hollanda', code: 'AMS', name: 'Schiphol Havalimanı',                lat: 52.310, lon: 4.768 },
  { city: 'Berlin',   country: 'Almanya', code: 'BER', name: 'Berlin Brandenburg Havalimanı',       lat: 52.366, lon: 13.503 },
  { city: 'Frankfurt',country: 'Almanya', code: 'FRA', name: 'Frankfurt Havalimanı',                lat: 50.037, lon: 8.562 },
  { city: 'Münih',    country: 'Almanya', code: 'MUC', name: 'Franz Josef Strauss Havalimanı',      lat: 48.353, lon: 11.786 },
  { city: 'Hamburg',  country: 'Almanya', code: 'HAM', name: 'Hamburg Havalimanı',                  lat: 53.630, lon: 9.988 },
  { city: 'Düsseldorf',country:'Almanya', code: 'DUS', name: 'Düsseldorf Havalimanı',               lat: 51.290, lon: 6.766 },
  { city: 'Stuttgart',country: 'Almanya', code: 'STR', name: 'Stuttgart Havalimanı',                lat: 48.690, lon: 9.222 },
  { city: 'Köln',     country: 'Almanya', code: 'CGN', name: 'Köln Bonn Havalimanı',                lat: 50.866, lon: 7.143 },
  { city: 'Viyana',   country: 'Avusturya', code: 'VIE', name: 'Viyana Uluslararası',               lat: 48.110, lon: 16.570 },
  { city: 'Zürih',    country: 'İsviçre', code: 'ZRH', name: 'Zürih Havalimanı',                    lat: 47.464, lon: 8.549 },
  { city: 'Cenevre',  country: 'İsviçre', code: 'GVA', name: 'Cenevre Havalimanı',                  lat: 46.238, lon: 6.109 },
  { city: 'Brüksel',  country: 'Belçika', code: 'BRU', name: 'Brüksel Havalimanı',                  lat: 50.901, lon: 4.484 },
  { city: 'Kopenhag', country: 'Danimarka', code: 'CPH', name: 'Kastrup Havalimanı',                lat: 55.618, lon: 12.656 },
  { city: 'Stockholm',country: 'İsveç', code: 'ARN', name: 'Arlanda Havalimanı',                    lat: 59.652, lon: 17.918 },
  { city: 'Oslo',     country: 'Norveç', code: 'OSL', name: 'Gardermoen Havalimanı',                lat: 60.193, lon: 11.100 },
  { city: 'Helsinki', country: 'Finlandiya', code: 'HEL', name: 'Helsinki Havalimanı',              lat: 60.317, lon: 24.963 },
  { city: 'Atina',    country: 'Yunanistan', code: 'ATH', name: 'Eleftherios Venizelos Havalimanı', lat: 37.937, lon: 23.945 },
  { city: 'Selanik',  country: 'Yunanistan', code: 'SKG', name: 'Makedonya Havalimanı',             lat: 40.519, lon: 22.971 },
  { city: 'Belgrad',  country: 'Sırbistan', code: 'BEG', name: 'Nikola Tesla Havalimanı',           lat: 44.819, lon: 20.309 },
  { city: 'Sofya',    country: 'Bulgaristan', code: 'SOF', name: 'Sofya Havalimanı',                lat: 42.696, lon: 23.412 },
  { city: 'Bükreş',   country: 'Romanya', code: 'OTP', name: 'Henri Coandă Havalimanı',             lat: 44.572, lon: 26.085 },
  { city: 'Budapeşte',country: 'Macaristan', code: 'BUD', name: 'Liszt Ferenc Havalimanı',          lat: 47.439, lon: 19.262 },
  { city: 'Varşova',  country: 'Polonya', code: 'WAW', name: 'Chopin Havalimanı',                   lat: 52.166, lon: 20.967 },
  { city: 'Prag',     country: 'Çekya',   code: 'PRG', name: 'Václav Havel Havalimanı',             lat: 50.101, lon: 14.260 },
  { city: 'Moskova',  country: 'Rusya',   code: 'SVO', name: 'Şeremetyevo Havalimanı',              lat: 55.973, lon: 37.415 },
  { city: 'Saint Petersburg', country: 'Rusya', code: 'LED', name: 'Pulkovo Havalimanı',            lat: 59.800, lon: 30.262 },
  { city: 'Kiev',     country: 'Ukrayna', code: 'IEV', name: 'Boryspil Havalimanı',                 lat: 50.345, lon: 30.894 },

  /* ---------- Middle East ---------- */
  { city: 'Dubai',    country: 'BAE',     code: 'DXB', name: 'Dubai Uluslararası',                  lat: 25.253, lon: 55.366 },
  { city: 'Abu Dabi', country: 'BAE',     code: 'AUH', name: 'Zayed Uluslararası',                  lat: 24.433, lon: 54.651 },
  { city: 'Doha',     country: 'Katar',   code: 'DOH', name: 'Hamad Uluslararası',                  lat: 25.273, lon: 51.608 },
  { city: 'Tahran',   country: 'İran',    code: 'IKA', name: 'İmam Humeyni Havalimanı',             lat: 35.416, lon: 51.152 },
  { city: 'Bağdat',   country: 'Irak',    code: 'BGW', name: 'Bağdat Havalimanı',                   lat: 33.262, lon: 44.234 },
  { city: 'Beyrut',   country: 'Lübnan',  code: 'BEY', name: 'Rafic Hariri Havalimanı',             lat: 33.821, lon: 35.488 },
  { city: 'Amman',    country: 'Ürdün',   code: 'AMM', name: 'Queen Alia Havalimanı',               lat: 31.722, lon: 35.993 },
  { city: 'Tel Aviv', country: 'İsrail',  code: 'TLV', name: 'Ben Gurion Havalimanı',               lat: 32.011, lon: 34.886 },
  { city: 'Riyad',    country: 'S. Arabistan', code: 'RUH', name: 'Kral Halid Havalimanı',          lat: 24.957, lon: 46.698 },
  { city: 'Cidde',    country: 'S. Arabistan', code: 'JED', name: 'Kral Abdülaziz Havalimanı',      lat: 21.679, lon: 39.156 },
  { city: 'Kuveyt',   country: 'Kuveyt',  code: 'KWI', name: 'Kuveyt Uluslararası',                 lat: 29.226, lon: 47.968 },

  /* ---------- Africa ---------- */
  { city: 'Kahire',   country: 'Mısır',   code: 'CAI', name: 'Kahire Uluslararası',                 lat: 30.111, lon: 31.413 },
  { city: 'İskenderiye', country: 'Mısır', code: 'HBE', name: 'Borg El Arab',                       lat: 30.917, lon: 29.696 },
  { city: 'Hartum',   country: 'Sudan',   code: 'KRT', name: 'Hartum Uluslararası',                 lat: 15.589, lon: 32.553 },
  { city: 'Addis Ababa', country: 'Etiyopya', code: 'ADD', name: 'Bole Uluslararası',               lat: 8.978, lon: 38.799 },
  { city: 'Nairobi',  country: 'Kenya',   code: 'NBO', name: 'Jomo Kenyatta Havalimanı',            lat: -1.319, lon: 36.928 },
  { city: 'Lagos',    country: 'Nijerya', code: 'LOS', name: 'Murtala Muhammed Havalimanı',         lat: 6.577, lon: 3.321 },
  { city: 'Johannesburg', country: 'G. Afrika', code: 'JNB', name: 'O.R. Tambo Uluslararası',       lat: -26.139, lon: 28.246 },
  { city: 'Cape Town',country: 'G. Afrika', code: 'CPT', name: 'Cape Town Uluslararası',            lat: -33.969, lon: 18.597 },
  { city: 'Kazablanka', country: 'Fas',   code: 'CMN', name: 'Mohammed V Uluslararası',             lat: 33.367, lon: -7.590 },
  { city: 'Tunus',    country: 'Tunus',   code: 'TUN', name: 'Tunus-Carthage Havalimanı',           lat: 36.851, lon: 10.227 },
  { city: 'Cezayir',  country: 'Cezayir', code: 'ALG', name: 'Houari Boumediene Havalimanı',        lat: 36.691, lon: 3.215 },
  { city: 'Dakar',    country: 'Senegal', code: 'DSS', name: 'Blaise Diagne Havalimanı',            lat: 14.671, lon: -17.073 },

  /* ---------- Asia ---------- */
  { city: 'Tokyo',    country: 'Japonya', code: 'HND', name: 'Haneda Havalimanı',                   lat: 35.553, lon: 139.781 },
  { city: 'Tokyo',    country: 'Japonya', code: 'NRT', name: 'Narita Uluslararası',                 lat: 35.765, lon: 140.386 },
  { city: 'Osaka',    country: 'Japonya', code: 'KIX', name: 'Kansai Uluslararası',                 lat: 34.434, lon: 135.232 },
  { city: 'Seul',     country: 'G. Kore', code: 'ICN', name: 'Incheon Uluslararası',                lat: 37.460, lon: 126.443 },
  { city: 'Pekin',    country: 'Çin',     code: 'PEK', name: 'Pekin Capital Havalimanı',            lat: 40.080, lon: 116.585 },
  { city: 'Pekin',    country: 'Çin',     code: 'PKX', name: 'Daxing Havalimanı',                   lat: 39.510, lon: 116.412 },
  { city: 'Şanghay',  country: 'Çin',     code: 'PVG', name: 'Pudong Uluslararası',                 lat: 31.143, lon: 121.805 },
  { city: 'Guangzhou',country: 'Çin',     code: 'CAN', name: 'Baiyun Uluslararası',                 lat: 23.392, lon: 113.299 },
  { city: 'Hong Kong',country: 'Hong Kong', code: 'HKG', name: 'Hong Kong Uluslararası',            lat: 22.308, lon: 113.918 },
  { city: 'Taipei',   country: 'Tayvan',  code: 'TPE', name: 'Taoyuan Uluslararası',                lat: 25.077, lon: 121.232 },
  { city: 'Bangkok',  country: 'Tayland', code: 'BKK', name: 'Suvarnabhumi Havalimanı',             lat: 13.689, lon: 100.750 },
  { city: 'Kuala Lumpur', country: 'Malezya', code: 'KUL', name: 'Kuala Lumpur Uluslararası',       lat: 2.745, lon: 101.709 },
  { city: 'Singapur', country: 'Singapur',code: 'SIN', name: 'Changi Havalimanı',                   lat: 1.355, lon: 103.987 },
  { city: 'Manila',   country: 'Filipinler', code: 'MNL', name: 'Ninoy Aquino Havalimanı',          lat: 14.508, lon: 121.019 },
  { city: 'Jakarta',  country: 'Endonezya', code: 'CGK', name: 'Soekarno-Hatta Havalimanı',         lat: -6.125, lon: 106.655 },
  { city: 'Delhi',    country: 'Hindistan', code: 'DEL', name: 'Indira Gandhi Uluslararası',        lat: 28.556, lon: 77.100 },
  { city: 'Bombay',   country: 'Hindistan', code: 'BOM', name: 'Chhatrapati Shivaji Havalimanı',    lat: 19.089, lon: 72.868 },
  { city: 'Karaçi',   country: 'Pakistan', code: 'KHI', name: 'Jinnah Uluslararası',                lat: 24.906, lon: 67.161 },
  { city: 'Lahor',    country: 'Pakistan', code: 'LHE', name: 'Allama Iqbal Uluslararası',          lat: 31.521, lon: 74.404 },
  { city: 'İslamabad',country: 'Pakistan', code: 'ISB', name: 'İslamabad Uluslararası',             lat: 33.560, lon: 72.852 },
  { city: 'Kabil',    country: 'Afganistan', code: 'KBL', name: 'Hamid Karzai Uluslararası',        lat: 34.566, lon: 69.213 },
  { city: 'Daka',     country: 'Bangladeş', code: 'DAC', name: 'Hazrat Şahcelal Havalimanı',        lat: 23.843, lon: 90.398 },
  { city: 'Almatı',   country: 'Kazakistan', code: 'ALA', name: 'Almatı Havalimanı',                lat: 43.352, lon: 77.040 },
  { city: 'Bişkek',   country: 'Kırgızistan', code: 'FRU', name: 'Manas Havalimanı',                lat: 43.061, lon: 74.477 },
  { city: 'Aşkabat',  country: 'Türkmenistan', code: 'ASB', name: 'Aşkabat Havalimanı',             lat: 37.987, lon: 58.361 },
  { city: 'Bakü',     country: 'Azerbaycan', code: 'GYD', name: 'Haydar Aliyev Havalimanı',         lat: 40.467, lon: 50.047 },
  { city: 'Tiflis',   country: 'Gürcistan', code: 'TBS', name: 'Tiflis Havalimanı',                 lat: 41.669, lon: 44.954 },
  { city: 'Erivan',   country: 'Ermenistan', code: 'EVN', name: 'Zvartnots Havalimanı',             lat: 40.147, lon: 44.395 },

  /* ---------- Americas ---------- */
  { city: 'New York', country: 'ABD',     code: 'JFK', name: 'John F. Kennedy Uluslararası',        lat: 40.640, lon: -73.779 },
  { city: 'New York', country: 'ABD',     code: 'EWR', name: 'Newark Liberty Uluslararası',         lat: 40.692, lon: -74.169 },
  { city: 'Los Angeles', country: 'ABD',  code: 'LAX', name: 'Los Angeles Uluslararası',            lat: 33.943, lon: -118.408 },
  { city: 'San Francisco', country: 'ABD',code: 'SFO', name: 'San Francisco Uluslararası',          lat: 37.621, lon: -122.378 },
  { city: 'Chicago',  country: 'ABD',     code: 'ORD', name: 'O\'Hare Uluslararası',                lat: 41.978, lon: -87.904 },
  { city: 'Miami',    country: 'ABD',     code: 'MIA', name: 'Miami Uluslararası',                  lat: 25.795, lon: -80.290 },
  { city: 'Washington', country: 'ABD',   code: 'IAD', name: 'Dulles Uluslararası',                 lat: 38.944, lon: -77.456 },
  { city: 'Boston',   country: 'ABD',     code: 'BOS', name: 'Logan Uluslararası',                  lat: 42.366, lon: -71.020 },
  { city: 'Atlanta',  country: 'ABD',     code: 'ATL', name: 'Hartsfield-Jackson Havalimanı',       lat: 33.640, lon: -84.428 },
  { city: 'Houston',  country: 'ABD',     code: 'IAH', name: 'George Bush Uluslararası',            lat: 29.984, lon: -95.341 },
  { city: 'Dallas',   country: 'ABD',     code: 'DFW', name: 'Dallas/Fort Worth Uluslararası',      lat: 32.897, lon: -97.038 },
  { city: 'Seattle',  country: 'ABD',     code: 'SEA', name: 'Seattle-Tacoma Uluslararası',         lat: 47.449, lon: -122.309 },
  { city: 'Toronto',  country: 'Kanada',  code: 'YYZ', name: 'Pearson Uluslararası',                lat: 43.677, lon: -79.630 },
  { city: 'Montreal', country: 'Kanada',  code: 'YUL', name: 'Pierre Elliott Trudeau Havalimanı',   lat: 45.470, lon: -73.741 },
  { city: 'Vancouver',country: 'Kanada',  code: 'YVR', name: 'Vancouver Uluslararası',              lat: 49.194, lon: -123.184 },
  { city: 'Mexico City', country: 'Meksika', code: 'MEX', name: 'Benito Juárez Uluslararası',       lat: 19.436, lon: -99.072 },
  { city: 'Cancún',   country: 'Meksika', code: 'CUN', name: 'Cancún Uluslararası',                 lat: 21.036, lon: -86.877 },
  { city: 'Havana',   country: 'Küba',    code: 'HAV', name: 'José Martí Uluslararası',             lat: 22.989, lon: -82.409 },
  { city: 'Panama',   country: 'Panama',  code: 'PTY', name: 'Tocumen Uluslararası',                lat: 9.072, lon: -79.385 },
  { city: 'São Paulo',country: 'Brezilya', code: 'GRU', name: 'Guarulhos Uluslararası',             lat: -23.435, lon: -46.473 },
  { city: 'Rio de Janeiro', country: 'Brezilya', code: 'GIG', name: 'Galeão Uluslararası',          lat: -22.810, lon: -43.250 },
  { city: 'Buenos Aires', country: 'Arjantin', code: 'EZE', name: 'Ezeiza Uluslararası',            lat: -34.822, lon: -58.535 },
  { city: 'Santiago', country: 'Şili',    code: 'SCL', name: 'Arturo Merino Benítez Havalimanı',    lat: -33.393, lon: -70.785 },
  { city: 'Bogota',   country: 'Kolombiya', code: 'BOG', name: 'El Dorado Uluslararası',            lat: 4.701, lon: -74.146 },
  { city: 'Lima',     country: 'Peru',    code: 'LIM', name: 'Jorge Chávez Uluslararası',           lat: -12.022, lon: -77.114 },
  { city: 'Caracas',  country: 'Venezuela', code: 'CCS', name: 'Simón Bolívar Uluslararası',        lat: 10.601, lon: -66.991 },

  /* ---------- Oceania ---------- */
  { city: 'Sydney',   country: 'Avustralya', code: 'SYD', name: 'Kingsford Smith Havalimanı',       lat: -33.946, lon: 151.177 },
  { city: 'Melbourne',country: 'Avustralya', code: 'MEL', name: 'Tullamarine Havalimanı',           lat: -37.673, lon: 144.843 },
];

/**
 * Filter airports by free-text query — matches city, IATA, country, name.
 * Case- and diacritic-insensitive. Returns up to `limit` results.
 *
 * Grouped by city when returning, so multiple airports for the same
 * city are shown together (Istanbul → IST + SAW).
 */
function searchAirports(query, limit = 30) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return AIRPORTS.slice(0, limit);
  const norm = (s) => s
    .toLowerCase()
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c');
  const nq = norm(q);
  return AIRPORTS.filter((a) => {
    const hay = norm(`${a.city} ${a.code} ${a.country} ${a.name}`);
    return hay.includes(nq);
  }).slice(0, limit);
}

export { AIRPORTS, searchAirports };
