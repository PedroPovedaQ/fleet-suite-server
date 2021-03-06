import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
async function main() {
  let type = 'driver';
  const driverCategories = await prisma.category.createMany({
    data: [
      { name: 'CDL', type, expires: true },
      { name: 'Social Security Card', type, expires: false },
      { name: 'Medical', type, expires: true },
      { name: 'Drug Test', type, expires: false },
      { name: 'MVR', type, expires: true },
      { name: 'PSP', type, expires: false },
      { name: 'Clearinghouse', type, expires: false },
      { name: 'Driver Application', type, expires: false },
      { name: 'Employment Verifications', type, expires: false },
      { name: 'Agreements', type, expires: false },
      { name: 'Other', type, expires: false },
    ],
  });
  type = 'truck';
  const truckCategories = await prisma.category.createMany({
    data: [
      { name: 'Inspection', type, expires: true },
      { name: 'Registration', type, expires: true },
      { name: '2290', type, expires: false },
      { name: 'Phys-Dam Insurance', type, expires: true },
      { name: 'Non-Truck Insurance', type, expires: true },
      { name: 'Permits', type, expires: false },
      { name: 'Lease Agreement', type, expires: true },
      { name: 'W9', type, expires: false },
      { name: 'Direct Deposit', type, expires: false },
      { name: 'Lease Cancellation', type, expires: false },
      { name: 'Fuel Card', type, expires: false },
      { name: 'VIR', type, expires: false },
      { name: 'Maintenance', type, expires: false },
      { name: 'Other', type, expires: false },
    ],
  });
  type = 'trailer';
  const trailerCategories = await prisma.category.createMany({
    data: [
      { name: 'Inspection', type, expires: true },
      { name: 'Registration', type, expires: true },
      { name: 'Insurance', type, expires: true },
      { name: 'VIR', type, expires: false },
      { name: 'Maintenance', type, expires: false },
      { name: 'Other', type, expires: false },
    ],
  });

  type = 'load';
  const loadCategories = await prisma.category.createMany({
    data: [
      { name: 'Load Confirmation', type, expires: false },
      { name: 'BOL', type, expires: false },
      { name: 'Claims', type, expires: false },
      { name: 'Other', type, expires: false },
    ],
  });

  // { connect: { id: 1 } }
  const trailer = await prisma.trailer.createMany({
    data: [
      {
        ventilated: false,
        year: 2000,
        make: 'Chrysler',
        model: 'Large Trailer',
        owner_name: 'Marcus Aurelius',
        owner_email: 'xjmaa@jj.com',
        unit_number: 'AB23321',
        registration_number: 'DMKXX20208',
        vin_number: 'JTDKBRFU9J30593O7',
        owner_phone: '407-607-9329',
        license_plate: 'BMG0009',
      },
      {
        ventilated: false,
        year: 2000,
        make: 'Ford',
        model: 'Lightning Trailer',
        owner_name: 'Hooptie McDoobersnatch',
        owner_email: 'xjmaa@jj.com',
        unit_number: 'AB2X392',
        registration_number: 'DXDSAD20208',
        vin_number: 'JTDSDXEDJ30593O7',
        owner_phone: '407-607-9329',
        license_plate: 'BMG0009',
      },
    ],
  });
  const hashedPassword = await bcrypt.hash('123123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Vanessa Zameza',
      email: 'vz1@vz.com',
      password: hashedPassword,
    },
  });

  const truck = await prisma.truck.createMany({
    data: [
      {
        owned_by_company: false,
        year: 2020,
        make: 'FREIGHTLINER',
        model: 'Cascadia',
        color: 'blue',
        owner_name: 'Clay Douglas',
        owner_email: 'xjmaa@jj.com',
        unit_number: 'AB2XX21',
        registration_number: 'DMK330208',
        vin_number: 'JTDKB73XC593O7',
        owner_phone: '407-607-9329',
        license_plate: 'BMG3309',
        dispatcherId: 1,
        trailerId: 1,
      },
      {
        owned_by_company: false,
        year: 2020,
        make: 'Kenworth',
        model: 'W990',
        color: 'black',
        owner_name: 'Brad Forrester',
        owner_email: 'bforest@jj.com',
        unit_number: 'MNAB233',
        registration_number: 'ZZ88208',
        vin_number: 'JT12393320593O7',
        owner_phone: '407-607-3339',
        license_plate: 'AXL3304',
        dispatcherId: 1,
        trailerId: 2,
      },
      // {
      //   owned_by_company: false,
      //   year: 2019,
      //   make: 'Peterbilt',
      //   model: '579',
      //   color: 'red',
      //   owner_name: 'Barry Schwartz',
      //   owner_email: 'bforest@jj.com',
      //   unit_number: 'NAGTX3',
      //   registration_number: 'ZZKX453208',
      //   vin_number: 'JTDKBRFU027593O7',
      //   owner_phone: '407-607-3339',
      //   license_plate: 'SPX304',
      // },
      // {
      //   owned_by_company: false,
      //   year: 2020,
      //   make: 'Volvo',
      //   model: 'VNL 860',
      //   color: 'silver',
      //   owner_name: 'Mike Hall',
      //   owner_email: 'rustyv@jj.com',
      //   unit_number: 'XAVB233',
      //   registration_number: 'Z321420208',
      //   vin_number: 'JTD23213320593O7',
      //   owner_phone: '407-607-3339',
      //   license_plate: 'PFGXSD3',
      // },
      // {
      //   owned_by_company: false,
      //   year: 2020,
      //   make: 'Volvo',
      //   model: 'VNL 760',
      //   color: 'orange',
      //   owner_name: 'Avery Shoaf',
      //   owner_email: 'shoafster@jj.com',
      //   unit_number: 'AB67833',
      //   registration_number: 'ZZKXX20208',
      //   vin_number: 'JTDKB6783320593O7',
      //   owner_phone: '407-607-3339',
      //   license_plate: 'XAQ302X',
      // },
    ],
  });

  const driver = await prisma.driver.createMany({
    data: [
      {
        status: 'RED',
        first_name: 'Phillip',
        middle_name: 'D',
        last_name: 'Thomas',
        cdl_number: 'P10321882',
        cdl_state: 'FL',
        experience_years: 2,
        phone: '407-607-4323',
        email: 'j2333mes@email.com',
        price_per_mile: 20,
        truckId: 1,
      },
      {
        status: 'RED',
        first_name: 'Sanjay',
        middle_name: '',
        last_name: 'Gupta',
        cdl_number: 'P1038633882',
        cdl_state: 'FL',
        experience_years: 4,
        phone: '407-607-4326',
        email: 'jwew3mes@email.com',
        price_per_mile: 40,
        truckId: 1,
      },
      {
        status: 'GREEN',
        first_name: 'Timothy',
        middle_name: 'D',
        last_name: 'Thacker',
        cdl_number: 'P1032238ss82',
        cdl_state: 'FL',
        experience_years: 2,
        phone: '407-607-4323',
        email: 'j233dd3mes@email.com',
        price_per_mile: 25,
        // truckId: 2,
      },
      {
        status: 'GREEN',
        first_name: 'Mike',
        middle_name: 'D',
        last_name: 'Jones',
        cdl_number: 'P1323238ss82',
        cdl_state: 'FL',
        experience_years: 5,
        phone: '407-633-4233',
        email: 'j77773mes@email.com',
        price_per_mile: 30,
        // truckId: 2,
      },
      {
        status: 'GREEN',
        first_name: 'Mark',
        middle_name: 'D',
        last_name: 'Flemings',
        cdl_number: 'P993238ss82',
        cdl_state: 'FL',
        experience_years: 5,
        phone: '327-633-4233',
        email: '127773mes@email.com',
        price_per_mile: 45,
        // truckId: 3,
      },
      {
        status: 'GREEN',
        first_name: 'Charles',
        middle_name: 'D',
        last_name: 'Williams',
        cdl_number: 'P342338ss82',
        cdl_state: 'FL',
        experience_years: 5,
        phone: '407-633-4233',
        email: '11237773mes@email.com',
        price_per_mile: 19,
        // truckId: 4,
      },
      {
        status: 'GREEN',
        first_name: 'Boris',
        middle_name: 'X',
        last_name: 'Jackson',
        cdl_number: '33242338ss82',
        cdl_state: 'FL',
        experience_years: 1,
        phone: '907-633-4233',
        email: 'fgbdikopdfg3mes@email.com',
        price_per_mile: 20,
        // truckId: 5,
      },
    ],
  });

  const locations = await prisma.location.createMany({
    data: [
      { name: 'Miami, Fl', truckId: 1 },
      { name: 'Key West, Fl', truckId: 2 },
    ],
  });

  const brokerage = await prisma.brokerage.createMany({
    data: [
      {
        mc_number: '718177',
        name: 'CH Robinson',
      },
      {
        mc_number: '271817',
        name: 'Echo Logistics',
      },
      {
        mc_number: '391817',
        name: 'Worldwide Express',
      },
      {
        mc_number: '999111',
        name: 'Coyote Logistics',
      },
    ],
  });

  const load = await prisma.load.createMany({
    data: [
      {
        brokerId: 1,
        truckId: 1,
        status: 'PENDING',
        origin: 'Orlando, FL',
        destination: 'New York, NY',
        date_start: '2021-06-21T05:00:00.000Z',
        date_end: '2021-07-08T05:00:00.000Z',
        deadhead_miles: 20,
        loaded_miles: 30,
        total_miles: 50,
        route: [],
        offer: 9852.59,
        agreed: 9963.33,
      },
      // {
      //   brokerId: 2,
      //   truckId: 2,
      //   status: 'ACTIVE',
      //   origin: 'St. Louis, MO',
      //   destination: 'Milwaukee, WI',
      //   date_start: '2021-06-19T04:00:00.000Z',
      //   date_end: '2021-07-12T04:00:00.000Z',
      //   deadhead_miles: 30,
      //   loaded_miles: 40,
      //   total_miles: 70,
      //   userId: 1,
      //   route: [],
      //   driverId: 2,
      //   offer: 9852.59,
      //   agreed: 9963.33,
      // },
      // {
      //   brokerId: 3,
      //   truckId: 3,
      //   status: 'ACTIVE',
      //   origin: 'Atlanta, GA',
      //   destination: 'Charleston, WV',
      //   date_start: '2021-06-20T04:00:00.000Z',
      //   date_end: '2021-07-15T04:00:00.000Z',
      //   deadhead_miles: 30,
      //   loaded_miles: 30,
      //   total_miles: 60,
      //   userId: 1,
      //   route: [],
      //   driverId: 3,
      //   offer: 9852.59,
      //   agreed: 9963.33,
      // },
      // {
      //   brokerId: 3,
      //   truckId: 4,
      //   status: 'ACTIVE',
      //   origin: 'Richmond, VA',
      //   destination: 'Raleigh, NC',
      //   date_start: '2021-06-19T04:00:00.000Z',
      //   date_end: '2021-07-12T04:00:00.000Z',
      //   deadhead_miles: 100,
      //   loaded_miles: 300,
      //   total_miles: 400,
      //   userId: 1,
      //   route: [],
      //   driverId: 3,
      //   offer: 9852.59,
      //   agreed: 9963.33,
      // },
      // {
      //   brokerId: 2,
      //   truckId: 2,
      //   status: 'ACTIVE',
      //   origin: 'Vineland, NJ',
      //   destination: 'Burlington, VT',
      //   date_start: '2021-06-19T04:00:00.000Z',
      //   date_end: '2021-07-12T04:00:00.000Z',
      //   deadhead_miles: 200,
      //   loaded_miles: 300,
      //   total_miles: 500,
      //   userId: 1,
      //   route: [],
      //   driverId: 4,
      //   offer: 9852.59,
      //   agreed: 9963.33,
      // },
      // {
      //   brokerId: 1,
      //   truckId: 1,
      //   status: 'ACTIVE',
      //   origin: 'Naples, FL',
      //   destination: 'Orlando, FL',
      //   date_start: '2021-06-19T04:00:00.000Z',
      //   date_end: '2021-07-12T04:00:00.000Z',
      //   deadhead_miles: 900,
      //   loaded_miles: 300,
      //   total_miles: 1200,
      //   userId: 1,
      //   route: [],
      //   driverId: 5,
      //   offer: 9852.59,
      //   agreed: 9963.33,
      // },
      // {
      //   brokerId: 2,
      //   truckId: 2,
      //   status: 'ACTIVE',
      //   origin: 'Topeka, KS',
      //   destination: 'Kansas City, MO',
      //   date_start: '2021-06-20T04:00:00.000Z',
      //   date_end: '2021-07-23T04:00:00.000Z',
      //   deadhead_miles: 10,
      //   loaded_miles: 400,
      //   total_miles: 410,
      //   userId: 1,
      //   route: [],
      //   driverId: 2,
      //   offer: 9852.59,
      //   agreed: 9963.33,
      // },
    ],
  });

  console.log({
    driver,
    truck,
    locations,
    driverCategories,
    truckCategories,
    trailerCategories,
    loadCategories,
    trailer,
    load,
    user,
    brokerage,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
