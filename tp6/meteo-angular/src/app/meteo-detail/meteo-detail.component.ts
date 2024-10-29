import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MeteoService } from "../services/meteo.service";

@Component({
  selector: "app-meteo-detail",
  templateUrl: "./meteo-detail.component.html",
  styleUrls: ["./meteo-detail.component.css"],
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  forecast: any;
  dailyForecast: any[] = [];
  latlon: string = "";

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) {}

  ngOnInit() {
    this.getMeteo();
    this.getForecast();
  }

  getMeteo(): void {
    const name = this.route.snapshot.paramMap.get("name");
    console.log("getMeteo pour", name);
    if (name) {
      this.meteoService
        .getMeteo(name)
        .then((response) => {
          this.meteo = response;
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        })
        .catch((fail) => (this.meteo = fail));
    }
  }

  getForecast(): void {
    const name = this.route.snapshot.paramMap.get("name");
    if (name) {
      this.meteoService
        .getForecast(name)
        .then((response) => {
          // Фильтруем прогноз, чтобы получить данные на полдень каждого дня
          this.dailyForecast = response.list.filter((item: any) =>
            item.dt_txt.includes("12:00:00")
          );
        })
        .catch((error) => {
          console.error("Ошибка при получении прогноза:", error);
        });
    }
  }

  getTemperatureClass(temp: number): string {
    if (temp < 0) return "cold";
    if (temp < 15) return "cool";
    if (temp < 25) return "warm";
    return "hot";
  }
}
