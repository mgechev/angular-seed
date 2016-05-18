import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { FooterComponent } from '../../layout/footer/footer.component';
import { TopNavigationBarComponent } from '../../layout/topNavigationBar/topNavigationBar.component';
import { PageActionsComponent } from '../../layout/pageActions/pageActions.component';
import { SideBarComponent } from '../../layout/sideBar/sideBar.component';
import { QuickSidebarComponent } from '../../layout/quickSidebar/quickSidebar.component';

@Component({
    templateUrl: 'app/home/components/home.component.html',
    styleUrls: ['app/home/components/home.component.css'],
    directives: [ROUTER_DIRECTIVES, FooterComponent, PageActionsComponent, TopNavigationBarComponent,
        SideBarComponent, QuickSidebarComponent],
})
export class HomeComponent {
}
