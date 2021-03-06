import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html'
})
export class AddCategoryComponent implements OnInit {

  name: string;
  slug: string;
  description: string;
  order = 10;

  constructor(private _categoryService: CategoryService,
              private notifications: NotificationsService,
              private router: Router,
              private _loadBar: SlimLoadingBarService) {
    this._loadBar.color = '#ef5285';
  }

  ngOnInit() {
  }

  onInput() {
    this.slug = this.name.toLowerCase().replace(/ +/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
  }

  createCategory() {
    this._loadBar.start();
    this._categoryService.storeCategory({
      name: this.name,
      slug: this.slug,
      description: this.description,
      order: this.order
    }).subscribe(response => {
      this._loadBar.complete();

      if (response.success) {

        this.notifications.success('Success', response.message);

        // Redirect to categories:
        this.router.navigate(['/admin/categories']);
        return true;
      }
      return this.notifications.error('Error', response.message);
    }, errorResponse => {
      this._loadBar.complete();
      if (errorResponse.status !== 422) {
        return this.notifications.warn('Warning', 'Something went wrong.');
      } else {
        const errors = errorResponse.error.errors;
        return this.notifications.warn('Warning', errors[Object.keys(errors)[0]]);
      }
    });
  }
}
