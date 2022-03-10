import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from '@apppages/not-found/not-found.page';
import { IndexComponent } from './pages/index/index.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'not-found', component: NotFoundPage},
  {
    path: 'category',
    loadChildren: () => import('./pages/product-category/product.category.module').then(m => m.ProductCategoryModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/order/order.module').then(m => m.OrderModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
