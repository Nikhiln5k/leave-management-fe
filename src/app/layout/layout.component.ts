import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavActionsComponent } from '../shared/components/nav-actions/nav-actions.component';
import { JwtService } from '../core/services/jwt.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavActionsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private router = inject(Router);
  private jwtService = inject(JwtService);
  private user = this.jwtService.decode();
  menu = [
    {
      name: "Dashboard",
      path:  this.user.role === "ADMIN" ? '/dashboard/adminDash' : '/dashboard/empDash',
      navBtn: false
    },
    {
      name: "Leaves",
      path: "leaves",
      navBtn: true
    }
  ]
  navDet: any;
  title: string | undefined;
  path: string | undefined;

  ngOnInit(): void {
    this.path = this.router.url.toString().split('/')[1];
    this.title = this.path.charAt(0).toLocaleUpperCase() + this.path.slice(1);
    this.navDet = this.menu.find(res => res.path == this.path);
  }

  navigate(value: any) {
    this.navDet = value;
    this.router.navigate([value.path]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
