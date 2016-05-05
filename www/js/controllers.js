angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicActionSheet, $ionicPopup, $ionicPlatform) {
    $scope.takePicture = function() {
        if (ionic.Platform.isWebView()) {
           $ionicPlatform.ready(function() {
                $scope.hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Camera' },
                    { text: 'Library' }
                    ],
                    titleText: 'From Where?',
                    cancelText: 'Cancel',
                    cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {

                    console.log(index);

                    $scope.hideSheet();

                    if (parseInt(index) == 0) {
                        navigator.camera.getPicture(
                            function success(data) {
                                $scope.handleOutput(data);
                            },
                            function onFail(data) {
                                $scope.handleError(data);
                            }, 
                            { 
                                quality: 50, 
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.CAMERA
                            }
                        ); 
                    } else if (parseInt(index) == 1) {
                         navigator.camera.getPicture(
                            function success(data) {
                                $scope.handleOutput(data);
                            },
                            function onFail(data) {
                                $scope.handleError(data);
                            }, 
                            { 
                                quality: 50, 
                                destinationType: Camera.DestinationType.FILE_URI,
                                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                            }
                        ); 
                    }
                }
             });
            })
        } else {
            $scope.handleError("Not in the WebView");
        }
    }

    $scope.handleOutput = function(image) {
        $scope.imageURL = image;
    }

    $scope.handleError = function(err) {
        var alertPopup = $ionicPopup.alert({
            title: 'Oh no!',
            template: 'We had an camera error: ' + err
        });

        alertPopup.then(function(res) {
            //console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
