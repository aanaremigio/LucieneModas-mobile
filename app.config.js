import 'dotenv/config';

export default {
  expo: {
    name: "LucieneModas-mobile",
    slug: "LucieneModas-mobile",
    version: "1.0.0",

    extra: {
      apiUrl: process.env.API_URL,
      ambiente: process.env.AMBIENTE,
    },
  },
};
