/**
 * Created by syedf on 1/25/2016.
 */
angular
    .module ('GRIT')
    .service ('GitHubAPI', ['$http', function ($http) {
        var self = this;
        var gitHubAPIURL = "https://api.github.com/repos/";
        self.getAllOpenIssues = function (repoURL) {
            var repoDetails = getRepoDetailsFromURL(repoURL);
            if(repoDetails != 0){
                var url = gitHubAPIURL+repoDetails.authorName+'/'+repoDetails.repoName;
                return $http.get(url);
            }
        };
        self.getOpenIssuesFrom24hours = function (repoURL) {
            var repoDetails = getRepoDetailsFromURL(repoURL);
            if(repoDetails != 0) {
                var yesterday = new Date (new Date ().getTime () - (24 * 60 * 60 * 1000)); // get the same time but yesterday
                var url = gitHubAPIURL + repoDetails.authorName + '/' + repoDetails.repoName + '/issues?since=' + yesterday.toISOString ();
                return $http.get (url);
            }
        };
        self.getIssuesOpened24HoursAgoAndLessThanAWeek = function (repoURL) {
            var repoDetails = getRepoDetailsFromURL(repoURL);
            if(repoDetails != 0) {
                var today = new Date ();
                var aWeek = new Date (today.getTime () - (7 * 24 * 60 * 60 * 1000)); // find out all the issues in the last 7 days and subtract Issues of one day later
                var url = gitHubAPIURL + repoDetails.authorName + '/' + repoDetails.repoName + '/issues?per_page=100&since=' + aWeek.toISOString ();
                return $http.get (url);
            }
        };
}]);

function getRepoDetailsFromURL(repoUrl) {
    if(repoUrl){
        var temp = repoUrl.split('/');
        return {
            repoName : temp[temp.length-1],
            authorName : temp[temp.length-2]
        }
    }
    else
        return 0;
}