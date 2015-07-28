/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('app.services',[]).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});
