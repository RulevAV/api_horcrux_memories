//Методы работы с ролями в модальном окне
export const MethodsModalRole ={
//balance - Убирает дубликаты
//В меню выбора не предлагают ролей которые уже есть
    balance : (UserRoles:Array<string>,AllRoles:Array<string>,SetRolMenu:(value:Array<string>)=>void,setRolesModal:(value:Array<string>)=>void)=>{
        if (!!UserRoles)
        {
            let drop = AllRoles.filter( ( el:string ) => !UserRoles.includes( el ) );
            SetRolMenu(drop);
            setRolesModal(UserRoles);
        }else {
            SetRolMenu(AllRoles);
            setRolesModal([]);
        }
    },
    //Добавить роль пользователю
    AddRole : (name:string,SelectRoles:Array<string>,AllRoles:Array<string>,Setdropdown:(value:Array<string>)=>void,SetSelectRoles:(value:Array<string>)=>void)=>{
        let Roles = [...SelectRoles,name];
        MethodsModalRole.balance(Roles,AllRoles,Setdropdown,SetSelectRoles);
    },
    //Удалить роль у пользователя
    DeleteRole : (name:string,SelectRoles:Array<string>,AllRoles:Array<string>,Setdropdown:(value:Array<string>)=>void,SetSelectRoles:(value:Array<string>)=>void)=>{
        let mass = SelectRoles.filter((u:string)=> u!==name);
        MethodsModalRole.balance(mass,AllRoles,Setdropdown,SetSelectRoles);
    }
}



