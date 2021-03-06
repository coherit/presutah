define(['jquery',
    'knockout',
    'arches',
    'bindings/smartresize'],
function($, ko, arches) {
    var componentName = 'saved-searches';
    return ko.components.register(componentName, {
        viewModel: function(params) {
            var self = this;
            var mediaUrl = arches.urls.uploadedfiles;
            self.items = ko.observableArray([]);
            $.ajax({
                type: "GET",
                url: arches.urls.api_search_component_data + componentName,
                context: this
            }).done(function(response) {
                response.saved_searches.forEach(function(search) {
                  if (!search.SEARCH_DESCRIPTION.includes("Preservation Directory")) {
                    var searchImageUrl = (search.IMAGE && search.IMAGE.length > 0) ? search.IMAGE[0].url : '';
                    self.items.push({
                        image: searchImageUrl,
                        title: search.SEARCH_NAME,
                        subtitle: search.SEARCH_DESCRIPTION,
                        searchUrl: search.SEARCH_URL
                    });
                  };
                });
            });

            self.options = {
                itemSelector: '.ss-grid-item',
                masonry: {
                    columnWidth: 500,
                    gutterWidth: 25,
                }
            };
        },
        template: { require: 'text!templates/views/components/search/saved-searches.htm'}
    });
});
