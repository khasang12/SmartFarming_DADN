export const sliderData = [
  {
    title: "Garden 1",
    image: require("./assets/images/map1.jpg"),
  },
  {
    title: "Garden 2",
    image: require("./assets/images/map2.jpg"),
  },
  {
    title: "Garden 3",
    image: require("./assets/images/map3.jpg"),
  },
];

export const devices = [
  {
    _id: {
      $oid: "640231f830c0bba85e608a88",
    },
    feed_key: "iot-cnpm.sensor2",
    name: "Humidity 1",
    type: "sensor",
    status: true,
    auto: true,
    value: {
      $numberDecimal: "12.8",
    },
    desc: "Desc 1",
    last_update: {
      $date: {
        $numberLong: "1677690000000",
      },
    },
  },
  {
    _id: {
      $oid: "640231f830c0bba85e608a88",
    },
    feed_key: "iot-cnpm.sensor4",
    name: "Light 1",
    type: "sensor",
    status: true,
    auto: true,
    value: {
      $numberDecimal: "969",
    },
    desc: "Desc 1",
    last_update: {
      $date: {
        $numberLong: "1677690000000",
      },
    },
  },
  {
    _id: {
      $oid: "640231f830c0bba85e608a88",
    },
    feed_key: "iot-cnpm.sensor1",
    name: "Temperature 1",
    type: "sensor",
    status: true,
    auto: true,
    value: {
      $numberDecimal: "969",
    },
    desc: "Desc 1",
    last_update: {
      $date: {
        $numberLong: "1677690000000",
      },
    },
  },
  {
    _id: {
      $oid: "640231f830c0bba85e608a88",
    },
    feed_key: "iot-cnpm.button2",
    type: "motor",
    name: "Motor 1",
    status: true,
    auto: true,
    value: {
      $numberDecimal: "12.8",
    },
    desc: "Desc 1",
    last_update: {
      $date: {
        $numberLong: "1677690000000",
      },
    },
  },
  {
    _id: {
      $oid: "6402327730c0bba85e608a89",
    },
    feed_key: "iot-cnpm.button3",
    type: "pump",
    name: "Pump 1",
    status: false,
    auto: true,
    value: {
      $numberDecimal: "198",
    },
    desc: "Desc 2",
    last_update: {
      $date: {
        $numberLong: "1677776400000",
      },
    },
  },
  {
    _id: {
      $oid: "6402329c30c0bba85e608a8a",
    },
    feed_key: "iot-cnpm.button1",
    type: "fan",
    name: "Fan 1",
    status: true,
    auto: false,
    value: {
      $numberDecimal: "128",
    },
    desc: "Desc 3",
    last_update: {
      $date: {
        $numberLong: "1677690000000",
      },
    },
  },
];

export const farmers = [
  {
    _id: {
      $oid: "6402336630c0bba85e608a90",
    },
    name: "Sang",
    password: "hashedpassword",
    email: "sang@hcmut.edu.vn",
    phone: "0379890021",
    create_at: {
      $date: {
        $numberLong: "1680454800000",
      },
    },
    garden: [
      {
        $oid: "640232e530c0bba85e608a8b",
      },
    ],
  },
  {
    _id: {
      $oid: "6402336630c0bba85r608a90",
    },
    name: "Teddy Bear",
    password: "gauconngungoc",
    email: "teddybeear@hcmut.edu.vn",
    phone: "012012012012",
    create_at: {
      $date: {
        $numberLong: "1680954800000",
      },
    },
    garden: [
      {
        $oid: "640232e530c0bba85e608a8b",
      },
    ],
  },
  {
    _id: {
      $oid: "6402336630c0bba85r608a90",
    },
    name: "Hello Kitty",
    password: "gauconngungoc",
    email: "teddybeear@hcmut.edu.vn",
    phone: "012012012012",
    create_at: {
      $date: {
        $numberLong: "1680954800000",
      },
    },
    garden: [
      {
        $oid: "640232e530c0bba85e608a8b",
      },
    ],
  },
];

export const gardens = [
  {
    _id: {
      $oid: "640232e530c0bba85e608a8b",
    },
    name: "Garden 1",
    desc: "Desc Garden 1",
    lat: "128.0",
    lon: "129.0",
    group_key: "groupkey1",
    humid: "80",
    temp: "33.6",
    light: "75000",
    devices: [
      {
        $oid: "640231f830c0bba85e608a88",
      },
      {
        $oid: "6402327730c0bba85e608a89",
      },
      {
        $oid: "6402329c30c0bba85e608a8a",
      },
    ],
  },
  {
    _id: {
      $oid: "640332e530c0bba85e608a8b",
    },
    name: "Garden 2",
    desc: "Desc Garden 2",
    lat: "158.0",
    lon: "159.0",
    group_key: "groupkey2",
    humid: "80",
    temp: "33.6",
    light: "75000",
    devices: [
      {
        $oid: "640231f830c0bba85e608a88",
      },
      {
        $oid: "6402327730c0bba85e608a89",
      },
      {
        $oid: "6402329c30c0bba85e608a8a",
      },
    ],
  },
  {
    _id: {
      $oid: "640232f530c0bba85e608a8b",
    },
    name: "Garden 3",
    desc: "Desc Garden 3",
    lat: "121.2",
    lon: "123.6",
    group_key: "groupkey3",
    humid: "80",
    temp: "33.6",
    light: "75000",
    devices: [
      {
        $oid: "640231f830c0bba85e608a88",
      },
      {
        $oid: "6402327730c0bba85e608a89",
      },
      {
        $oid: "6402329c30c0bba85e608a8a",
      },
    ],
  },
];

export const gardenHistory = [
  {
    name: "Garden 1",
    group_key: "groupkey1",
    humid: "80",
    temp: "33.6",
    light: "75000",
    timestamp: "08/12/2022 15:00:00",
    status: "alert",
  },
  {
    name: "Garden 1",
    group_key: "groupkey1",
    humid: "80",
    temp: "33.6",
    light: "75000",
    timestamp: "08/12/2022 18:00:00",
    status: "warning",
  },
  {
    name: "Garden 1",
    group_key: "groupkey1",
    humid: "80",
    temp: "33.6",
    light: "75000",
    timestamp: "08/12/2022 21:00:00",
    status: "normal",
  },
];

export const actionHistory = [
  {
    name: "Garden 1",
    feed_key: "feedkey1",
    desc: "Pump",
    user: "Sang Kha",
    timestamp: "12:46:23 08/12/2022",
  },
  {
    name: "Garden 1",
    feed_key: "feedkey2",
    desc: "Motor",
    user: "IoT-Bot",
    timestamp: "16:46:53 09/12/2022",
  },
  {
    name: "Garden 1",
    feed_key: "feedkey3",
    desc: "Fan",
    user: "Teddy Bear",
    timestamp: "14:20:16 10/12/2022",
  },
];
