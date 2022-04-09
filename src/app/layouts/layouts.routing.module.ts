import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeLayout } from "./home/home.layout";
import { UserDashboardLayout } from './user-dashboard/user-dashboard.layout';

const routes: Routes = [
  // Home
  {
    path: '',
    component: HomeLayout,
    children: [
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
    component: UserDashboardLayout,
    children: [
      {
        path: 'user-profile',
        loadChildren: () => import('../pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
