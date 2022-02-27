interface Waypoint {
  address?: string;
  latitude?: number;
  longitude?: number;
}
export class TruckRoutingRequestDto {
  waypoints: Array<Waypoint>;
  vehicleSpec?: any;
}
