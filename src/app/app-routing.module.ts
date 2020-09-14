import { NgModule } from '@angular/core'
import { Routes , RouterModule } from '@angular/router'
import { WholeContainerComponent } from './whole-container/whole-container.component'
import { SignInComponentComponent } from './sign-in-component/sign-in-component.component'
import { RegistrationComponentComponent } from './registration-component/registration-component.component'

const routes : Routes = [
    {path : 'todo/:username' , component: WholeContainerComponent},
    {path : '' , component : SignInComponentComponent},
    {path : 'sign_up' ,component: RegistrationComponentComponent}
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
    WholeContainerComponent, 
    SignInComponentComponent, 
    RegistrationComponentComponent
]