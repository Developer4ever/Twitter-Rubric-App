angular.module('twitterRubricApp', [])
.controller('FollowerController', function($scope, $filter) {
    var ctrl = this;

    // Static data with join_date in Unix timestamps
    ctrl.followers = [
      {
        "uid": 1,
        "username": "sampleuser1",
        "image": "https://randomuser.me/api/portraits/men/1.jpg",
        "fullname": "Sample User One",
        "twubric": {
          "total": 3.5,
          "friends": 1,
          "influence": 1,
          "chirpiness": 1.5
        },
        "join_date": 1358899200
      },
      {
        "uid": 2,
        "username": "sampleuser2",
        "image": "https://randomuser.me/api/portraits/women/2.jpg",
        "fullname": "Sample User Two",
        "twubric": {
          "total": 5,
          "friends": 1,
          "influence": 1,
          "chirpiness": 1.5
        },
        "join_date": 1355270400
      },
      {
        "uid": 3,
        "username": "sampleuser3",
        "image": "https://randomuser.me/api/portraits/women/3.jpg",
        "fullname": "Sample User Three",
        "twubric": {
          "total": 7,
          "friends": 1,
          "influence": 1,
          "chirpiness": 1.5
        },
        "join_date": 1289433600
      },
      {
        "uid": 4,
        "username": "sampleuser4",
        "image": "https://randomuser.me/api/portraits/men/4.jpg",
        "fullname": "Sample User Four",
        "twubric": {
          "total": 9,
          "friends": 2,
          "influence": 3,
          "chirpiness": 4
        },
        "join_date": 1300838400
      },
      {
        "uid": 5,
        "username": "sampleuser5",
        "image": "https://randomuser.me/api/portraits/men/5.jpg",
        "fullname": "Sample User Five",
        "twubric": {
          "total": 9,
          "friends": 1,
          "influence": 4,
          "chirpiness": 4
        },
        "join_date": 1230768000
      },
      {
        "uid": 6,
        "username": "sampleuser6",
        "image": "https://randomuser.me/api/portraits/men/6.jpg",
        "fullname": "Sample User Six",
        "twubric": {
          "total": 6,
          "friends": 2,
          "influence": 3,
          "chirpiness": 1
        },
        "join_date": 1252454400
      },
      {
        "uid": 7,
        "username": "sampleuser7",
        "image": "https://randomuser.me/api/portraits/women/7.jpg",
        "fullname": "Sample User Seven",
        "twubric": {
          "total": 8,
          "friends": 2,
          "influence": 4,
          "chirpiness": 2
        },
        "join_date": 1278201600
      },
      {
        "uid": 8,
        "username": "sampleuser8",
        "image": "https://randomuser.me/api/portraits/women/8.jpg",
        "fullname": "Sample User Eight",
        "twubric": {
          "total": 7,
          "friends": 2,
          "influence": 3,
          "chirpiness": 2
        },
        "join_date": 1331510400
      },
      {
        "uid": 9,
        "username": "sampleuser9",
        "image": "https://randomuser.me/api/portraits/men/9.jpg",
        "fullname": "Sample User Nine",
        "twubric": {
          "total": 8,
          "friends": 1,
          "influence": 4,
          "chirpiness": 3
        },
        "join_date": 1367971200
      },
      {
        "uid": 10,
        "username": "sampleuser10",
        "image": "https://randomuser.me/api/portraits/men/10.jpg",
        "fullname": "Sample User Ten",
        "twubric": {
          "total": 5,
          "friends": 1,
          "influence": 1,
          "chirpiness": 3
        },
        "join_date": 1228953600
      }
    ];

    ctrl.filteredFollowers = angular.copy(ctrl.followers);

    // Date filter properties
    ctrl.filter = {
        startDate: null,
        endDate: null
    };

    // Function to filter followers based on the selected date range
    ctrl.filterByDate = function() {
        // If no dates are set, return all followers
        if (!ctrl.filter.startDate && !ctrl.filter.endDate) {
            ctrl.filteredFollowers = angular.copy(ctrl.followers);
            return;
        }

        // Convert startDate and endDate to Unix timestamps in seconds
        var startDate = ctrl.filter.startDate ? new Date(ctrl.filter.startDate).getTime() / 1000 : null;
        var endDate = ctrl.filter.endDate ? new Date(ctrl.filter.endDate).getTime() / 1000 : null;

        // Filter followers based on date range
        ctrl.filteredFollowers = ctrl.followers.filter(function(follower) {
            var joinDate = follower.join_date;
            if (startDate && endDate) {
                return joinDate >= startDate && joinDate <= endDate;
            } else if (startDate) {
                return joinDate >= startDate;
            } else if (endDate) {
                return joinDate <= endDate;
            }
            return true;
        });
    };

    // Sort by selected criteria and toggle ascending/descending
    ctrl.sortBy = function(criteria) {
        if (ctrl.sortCriteria === criteria) {
            ctrl.sortReverse = !ctrl.sortReverse;
        } else {
            ctrl.sortCriteria = criteria;
            ctrl.sortReverse = false;
        }
        ctrl.filteredFollowers = $filter('orderBy')(ctrl.filteredFollowers, criteria, ctrl.sortReverse);
    };

    // Helper function to get the appropriate arrow direction
    ctrl.getArrowClass = function(criteria) {
        if (ctrl.sortCriteria === criteria) {
            return ctrl.sortReverse ? 'bi bi-arrow-down' : 'bi bi-arrow-up';
        }
        return '';
    };

    ctrl.removeFollower = function(follower) {
        ctrl.filteredFollowers = ctrl.filteredFollowers.filter(function(f) {
            return f.uid !== follower.uid;
        });
    };
});
