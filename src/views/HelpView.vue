<template>
    <h2 class="ma-4">Соцмережі</h2>
    <div>
        <a v-for="country in countries" :key="country.name" target="_blank" :href="country.link">
            <v-chip :key="country.name" class="ma-2 bg-blue-lighten-2 text-white text-h5 pa-3">
                {{ country.name }}
            </v-chip>
        </a>
    </div>
</template>

<script setup lang="ts">
const countries = [
  {
    name: ' Допомога українцям у Данії ',
    link: ' https://t.me/refugeesinDenmark ',
  },
  {
    name: ' Допомога українцям у Бельгії ',
    link: ' https://t.me/refugeesinBelgium ',
  },
  {
    name: ' Допомога українцям у Швейцарії ',
    link: ' https://t.me/refugeesinBelgium ',
  },
  {
    name: ' Допомога українцям у Литві ',
   link: ' https://lrv.lt/lt/aktuali-informacija/informacija-apie-situacija-ukrainoje/aktuali-informacija-1/karo-pabegeliu-is-ukrainos-priemimas-lietuvoje',
  },
  {
    name: ' Допомога українцям у Польщі ',
    link: ' https://t.me/refugeesinPoland ',
  },
  {
    name: ' Допомога українцям у Франції ',
    link: ' https://t.me/refugeesinFrance ',
  },
  {
    name: ' Допомога українцям у Німеччині',
    link: ' https://t.me/refugees_in_Germany ',
  },
  {
    name: ' Допомога українцям у Швеції ',
    link: ' https://t.me/refugeesinSweden ',
  },
  {
    name: ' Допомога українцям у Австрії ',
    link: ' https://t.me/refugeesinAustria ',
  },
  {
    name: ' Допомога українцям у Іспанії ',
    link: ' https://t.me/infohelpBCN ',
  },
  {
    name: ' Допомога українцям у Румунії ',
    link: ' https://www.facebook.com/groups/unitipentruucraina/',
  },
  {
    name: ' Допомога українцям у Словенії ',
    link: ' https://www.facebook.com/groups/179196962897968/',
  },
  {
    name: ' Допомога українцям у Португалії ',
    link: ' https://t.me/+j3_sMgK6QG8yMmVi ',
  },
  {
    name: ' Допомога українцям у Чехії ',
    link: ' https://icpraha.com/uk/%d0%b0%d1%81%d0%b8%d1%81%d1%82%d0%b5%d0%bd%d1%82%d1%81%d1%8c%d0%ba%d0%b8%d0%b9-%d1%86%d0%b5%d0%bd%d1%82%d1%80-%d0%b4%d0%bb%d1%8f-%d0%b1%d1%96%d0%b6%d0%b5%d0%bd%d1%86%d1%96%d0%b2-%d0%b7-%d1%83%d0%ba/?fbclid=IwAR1PTIg7XJAmcjHqyy4bCshBuomtkyGOLodtyMWRKFwaUbusONx8F91TU9s',
  },
]
</script>