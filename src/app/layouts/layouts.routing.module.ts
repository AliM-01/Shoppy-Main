import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLayout } from "./home/home.layout";
import { UserDashboardLayout } from './user-dashboard/user-dashboard.layout';
import { AuthGuard } from '../_guards/auth/auth.guard';
import { IndexComponent } from "@apppages/index/index.component";
import { NotFoundPage } from "@apppages/not-found/not-found.page";

const routes: Routes = [
  // Home
  {
    path: '',
    component: HomeLayout,
    children: [
      { path: '', component: IndexComponent },
      { path: 'not-found', component: NotFoundPage },
      {
        path: 'auth',
        loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'category',
        loadChildren: () => import('../pages/product-category/product.category.module').then(m => m.ProductCategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../pages/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('../pages/order/order.module').then(m => m.OrderModule)
      },
    ]
  },

  // User Dashboard
  {
    path: '',
    canActivate: [AuthGuard],
    component: UserDashboardLayout,
    children: [
      {
        path: 'user-profile',
        loadChildren: () => import('../pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
    ]
  },

  { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
