
ymaps.ready(init);

function init() {
    // Создаём карту
    const myMap = new ymaps.Map("map", {
        center: [59.93, 30.31], //питер
        zoom: 10
    });

    // Очищаем предыдущие объекты
    myMap.geoObjects.removeAll();

// Студия 1
const studio1 = new ymaps.Placemark([59.9343, 30.3351], {
    balloonContent: '<strong>Звуковая Аллея</strong><br>Адрес: Невский проспект, д. 50'
});
myMap.geoObjects.add(studio1);

// Студия 2
const studio2 = new ymaps.Placemark([59.9390, 30.3200], {
    balloonContent: '<strong>Мелодия на Ломоносова</strong><br>Адрес: ул. Ломоносова, д. 3'
});
myMap.geoObjects.add(studio2);

// Студия 3
const studio3 = new ymaps.Placemark([59.9139, 30.2929], {
    balloonContent: '<strong>Гитара Про</strong><br>Адрес: ул. Белинского, д. 15'
});
myMap.geoObjects.add(studio3);

// Студия 4
const studio4 = new ymaps.Placemark([59.9056, 30.3608], {
    balloonContent: '<strong>Ритм СПб</strong><br>Адрес: Московский проспект, д. 100'
});
myMap.geoObjects.add(studio4);

// Студия 5
const studio5 = new ymaps.Placemark([59.9438, 30.3116], {
    balloonContent: '<strong>Эхо Студио</strong><br>Адрес: Казанская ул., д. 7'
});
myMap.geoObjects.add(studio5);

// Студия 6
const studio6 = new ymaps.Placemark([59.9382, 30.3227], {
    balloonContent: '<strong>Звуковой Вектор</strong><br>Адрес: ул. Чайковского, д. 12'
});
myMap.geoObjects.add(studio6);

// Студия 7
const studio7 = new ymaps.Placemark([59.9372, 30.3242], {
    balloonContent: '<strong>Студия "Гармония"</strong><br>Адрес: ул. Рубинштейна, д. 18'
});
myMap.geoObjects.add(studio7);

// Студия 8
const studio8 = new ymaps.Placemark([59.9156, 30.3490], {
    balloonContent: '<strong>ProЗвук СПб</strong><br>Адрес: Лиговский проспект, д. 50'
});
myMap.geoObjects.add(studio8);

// Студия 9
const studio9 = new ymaps.Placemark([59.9238, 30.3461], {
    balloonContent: '<strong>Запись+</strong><br>Адрес: ул. Марата, д. 24'
});
myMap.geoObjects.add(studio9);

// Студия 10
const studio10 = new ymaps.Placemark([59.9362, 30.3264], {
    balloonContent: '<strong>Студия "Резонанс"</strong><br>Адрес: наб. канала Грибоедова, д. 55'
});
myMap.geoObjects.add(studio10);

// Студия 11
const studio11 = new ymaps.Placemark([59.9400, 30.3187], {
    balloonContent: '<strong>SoundBox</strong><br>Адрес: ул. Большая Конюшенная, д. 19'
});
myMap.geoObjects.add(studio11);

// Студия 12
const studio12 = new ymaps.Placemark([59.9365, 30.3466], {
    balloonContent: '<strong>ZvukOFF</strong><br>Адрес: ул. Куйбышева, д. 4'
});
myMap.geoObjects.add(studio12);

// Студия 13
const studio13 = new ymaps.Placemark([59.9353, 30.3378], {
    balloonContent: '<strong>Студия "Формула Звука"</strong><br>Адрес: ул. Карла Либкнехта, д. 4'
});
myMap.geoObjects.add(studio13);

// Студия 14
const studio14 = new ymaps.Placemark([59.9390, 30.3200], {
    balloonContent: '<strong>Studio 108</strong><br>Адрес: ул. Ломоносова, д. 27'
});
myMap.geoObjects.add(studio14);

// Студия 15
const studio15 = new ymaps.Placemark([59.9345, 30.3272], {
    balloonContent: '<strong>BeatBox Studio</strong><br>Адрес: ул. Чехова, д. 8'
});
myMap.geoObjects.add(studio15);

// Студия 16
const studio16 = new ymaps.Placemark([59.9148, 30.3601], {
    balloonContent: '<strong>Звукопульт</strong><br>Адрес: ул. Рентгена, д. 5'
});
myMap.geoObjects.add(studio16);

// Студия 17
const studio17 = new ymaps.Placemark([59.9148, 30.3601], {
    balloonContent: '<strong>MusicLab</strong><br>Адрес: ул. Марата, д. 69'
});
myMap.geoObjects.add(studio17);

// Студия 18
const studio18 = new ymaps.Placemark([59.9337, 30.3469], {
    balloonContent: '<strong>Студия "Созвучие"</strong><br>Адрес: ул. Восстания, д. 1'
});
myMap.geoObjects.add(studio18);

// Студия 19
const studio19 = new ymaps.Placemark([59.9503, 30.3076], {
    balloonContent: '<strong>Запись на Петроградке</strong><br>Адрес: Петроградская наб., д. 12'
});
myMap.geoObjects.add(studio19);

// Студия 20
const studio20 = new ymaps.Placemark([59.9094, 30.2638], {
    balloonContent: '<strong>SoundWave</strong><br>Адрес: ул. Савушкина, д. 141'
});
myMap.geoObjects.add(studio20);

// Студия 21
const studio21 = new ymaps.Placemark([59.8872, 30.3445], {
    balloonContent: '<strong>Студия "Волна"</strong><br>Адрес: ул. Бабушкина, д. 21'
});
myMap.geoObjects.add(studio21);

// Студия 22
const studio22 = new ymaps.Placemark([59.9724, 30.3923], {
    balloonContent: '<strong>MixPoint</strong><br>Адрес: ул. Полюстровская, д. 16'
});
myMap.geoObjects.add(studio22);

// Студия 23
const studio23 = new ymaps.Placemark([59.9610, 30.3167], {
    balloonContent: '<strong>Студия "Стоп Хенд"</strong><br>Адрес: ул. Комсомола, д. 45'
});
myMap.geoObjects.add(studio23);

// Студия 24
const studio24 = new ymaps.Placemark([59.9471, 30.3731], {
    balloonContent: '<strong>Звуковой Лабиринт</strong><br>Адрес: ул. Торжковская, д. 7'
});
myMap.geoObjects.add(studio24);

// Студия 25
const studio25 = new ymaps.Placemark([59.9158, 30.3739], {
    balloonContent: '<strong>Studio One</strong><br>Адрес: ул. Красного Текстильщика, д. 10/3'
});
myMap.geoObjects.add(studio25);

// Студия 26
const studio26 = new ymaps.Placemark([59.9514, 30.4017], {
    balloonContent: '<strong>EchoSound</strong><br>Адрес: ул. Дыбенко, д. 25'
});
myMap.geoObjects.add(studio26);

// Студия 27
const studio27 = new ymaps.Placemark([59.8823, 30.3227], {
    balloonContent: '<strong>Студия "Бас"</strong><br>Адрес: ул. Софийская, д. 11'
});
myMap.geoObjects.add(studio27);

// Студия 28
const studio28 = new ymaps.Placemark([59.8798, 30.3985], {
    balloonContent: '<strong>Звукопорт</strong><br>Адрес: ул. Егорова, д. 15'
});
myMap.geoObjects.add(studio28);

// Студия 29
const studio29 = new ymaps.Placemark([59.9402, 30.2842], {
    balloonContent: '<strong>Запись на Васильевском</strong><br>Адрес: Средний пр., В.О., д. 39'
});
myMap.geoObjects.add(studio29);

// Студия 30
const studio30 = new ymaps.Placemark([59.9337, 30.3078], {
    balloonContent: '<strong>Studio Beat</strong><br>Адрес: ул. Кронштадтская, д. 29'
});
myMap.geoObjects.add(studio30);

// Студия 31
const studio31 = new ymaps.Placemark([59.8553, 30.3614], {
    balloonContent: '<strong>SoundLine</strong><br>Адрес: ул. Курляндская, д. 1'
});
myMap.geoObjects.add(studio31);

// Студия 32
const studio32 = new ymaps.Placemark([59.9421, 30.3135], {
    balloonContent: '<strong>Студия "Миксмастер"</strong><br>Адрес: ул. Малая Посадская, д. 9'
});
myMap.geoObjects.add(studio32);

// Студия 33
const studio33 = new ymaps.Placemark([59.9182, 30.4027], {
    balloonContent: '<strong>Звуковой Путь</strong><br>Адрес: ул. Александра Невского, д. 2'
});
myMap.geoObjects.add(studio33);

// Студия 34
const studio34 = new ymaps.Placemark([59.8661, 30.2547], {
    balloonContent: '<strong>Studio Cube</strong><br>Адрес: ул. Маршала Жукова, д. 28'
});
myMap.geoObjects.add(studio34);

// Студия 35
const studio35 = new ymaps.Placemark([59.9094, 30.2638], {
    balloonContent: '<strong>Звуковая Фабрика</strong><br>Адрес: ул. Савушкина, д. 83'
});
myMap.geoObjects.add(studio35);

// Студия 36
const studio36 = new ymaps.Placemark([59.8941, 30.3378], {
    balloonContent: '<strong>Студия "Драйв"</strong><br>Адрес: ул. Бухарестская, д. 12'
});
myMap.geoObjects.add(studio36);

// Студия 37
const studio37 = new ymaps.Placemark([59.9197, 30.3735], {
    balloonContent: '<strong>SoundLab СПб</strong><br>Адрес: ул. Кузнецовская, д. 14'
});
myMap.geoObjects.add(studio37);

// Студия 38
const studio38 = new ymaps.Placemark([59.9352, 30.3407], {
    balloonContent: '<strong>Запись на Чернышевской</strong><br>Адрес: ул. Чернышевского, д. 17'
});
myMap.geoObjects.add(studio38);

// Студия 39
const studio39 = new ymaps.Placemark([59.9268, 30.3977], {
    balloonContent: '<strong>Studio Harmony</strong><br>Адрес: ул. Оптиков, д. 4'
});
myMap.geoObjects.add(studio39);

// Студия 40
const studio40 = new ymaps.Placemark([59.9527, 30.3183], {
    balloonContent: '<strong>Звуковое Пространство</strong><br>Адрес: ул. Учебная, д. 2'
});
myMap.geoObjects.add(studio40);

// Студия 41
const studio41 = new ymaps.Placemark([59.9172, 30.3941], {
    balloonContent: '<strong>BeatMaster Studio</strong><br>Адрес: ул. Ленина, д. 33'
});
myMap.geoObjects.add(studio41);

// Студия 42
const studio42 = new ymaps.Placemark([59.9584, 30.3429], {
    balloonContent: '<strong>Звуковой Кристалл</strong><br>Адрес: ул. Лесная, д. 15'
});
myMap.geoObjects.add(studio42);

// Студия 43
const studio43 = new ymaps.Placemark([59.9603, 30.3741], {
    balloonContent: '<strong>Studio Pulse</strong><br>Адрес: ул. Благодатная, д. 3'
});
myMap.geoObjects.add(studio43);

// Студия 44
const studio44 = new ymaps.Placemark([59.9701, 30.4113], {
    balloonContent: '<strong>SoundPro СПб</strong><br>Адрес: ул. Красногвардейская, д. 11'
});
myMap.geoObjects.add(studio44);

// Студия 45
const studio45 = new ymaps.Placemark([59.8762, 30.3418], {
    balloonContent: '<strong>Звуковой Горизонт</strong><br>Адрес: ул. Пражская, д. 47'
});
myMap.geoObjects.add(studio45);

// Студия 46
const studio46 = new ymaps.Placemark([59.9531, 30.3198], {
    balloonContent: '<strong>Studio Echo</strong><br>Адрес: ул. Арсенальная, д. 1'
});
myMap.geoObjects.add(studio46);

// Студия 47
const studio47 = new ymaps.Placemark([59.9094, 30.2638], {
    balloonContent: '<strong>Запись на Приморской</strong><br>Адрес: ул. Савушкина, д. 124'
});
myMap.geoObjects.add(studio47);

// Студия 48
const studio48 = new ymaps.Placemark([59.9451, 30.3798], {
    balloonContent: '<strong>SoundCore Studio</strong><br>Адрес: ул. Мантулинская, д. 12'
});
myMap.geoObjects.add(studio48);

// Студия 49
const studio49 = new ymaps.Placemark([59.9133, 30.3711], {
    balloonContent: '<strong>Звуковой Взмах</strong><br>Адрес: ул. Школьная, д. 45'
});
myMap.geoObjects.add(studio49);

// Студия 50
const studio50 = new ymaps.Placemark([59.9687, 30.3881], {
    balloonContent: '<strong>Studio Nova</strong><br>Адрес: ул. Победы, д. 28'
});
myMap.geoObjects.add(studio50);
 // Автоподстройка масштаба под все точки
    myMap.setBounds(myMap.geoObjects.getBounds(), {
        checkZoomRange: true,
        zoomMargin: 10
    });
}