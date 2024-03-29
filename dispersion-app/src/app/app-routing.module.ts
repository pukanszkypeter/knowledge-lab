import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from "./components/home/home.component";
import { SimulatorComponent } from "./components/simulator/simulator.component";
import { AutomatedTesterComponent } from "./components/automated-tester/automated-tester.component";
import { VisualizationComponent } from "./components/visualization/visualization.component";
import { OpenStreetMapComponent } from './components/open-street-map/open-street-map.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'simulator', component: SimulatorComponent},
  { path: 'tester', component: AutomatedTesterComponent},
  { path: 'results', component: VisualizationComponent},
  { path: 'open-street-map', component: OpenStreetMapComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
