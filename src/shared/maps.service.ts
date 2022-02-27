import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import axios from 'axios';
import { TruckRoutingRequestDto } from './dto/truck-routing-request.dto';
// @TODO: pull key from env
const key = 'Avwn72axNOgBSHbARjJNaZOfQBSsX02BtABVe9MzREq9mg2QZ9O9hlOtW91HkRWN';
@Injectable()
export class MapsService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: any) {}
  //@TODO: add user location
  queryLocations(query) {
    return axios
      .get(
        `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${query}&userLocation=47.668697,-122.376373,5&key=${key}`
      )
      .then((res) => {
        return res.data.resourceSets[0].resources[0].value;
      });
  }

  getQuickRoute(truckRequestBody: TruckRoutingRequestDto) {
    return axios
      .post(
        `https://dev.virtualearth.net/REST/v1/Routes/Truck?key=${key}`,
        truckRequestBody
      )
      .then((res) => {
        return res.data.resourceSets[0].resources[0];
      })
      .catch((err) => console.log(err));
  }
}
