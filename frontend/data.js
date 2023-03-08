export const sliderData = [
  {
    title: "First Map",
    image: require("./assets/images/map1.jpg"),
  },
  {
    title: "Second Map",
    image: require("./assets/images/map2.jpg"),
  },
  {
    title: "Third Map",
    image: require("./assets/images/map3.jpg"),
  },
];

export const devices = [
  {
    _id: {
      $oid: "640231f830c0bba85e608a88",
    },
    feed_key: "feedkeytest1",
    type: "type1",
    status: true,
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
    feed_key: "feedkeytest2",
    type: "type2",
    status: false,
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
    feed_key: "feedkeytest3",
    type: "type3",
    status: true,
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
];