var search = instantsearch({
  // Replace with your own values
  appId: 'Q423PHQ3EV',
  apiKey: 'ef6d158c8dd2e44bbf0d00fbfbb054d5', // search only API key, no ADMIN key
  indexName: 'application_BESTBUY',
  urlSync: true
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-input'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    templates: {
      item: document.getElementById('hit-template').innerHTML,
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination'
  })
);

search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#brand-refinement',
      attributeName: 'brand',
      sortBy: ['isRefined', 'count:desc', 'name:asc'],
      limit: 10,
      operator: 'or',
      templates: {
        header: 'Brand'
      },
      searchForFacetValues: {
        placeholder: 'Search for brands',
        templates: {
          noResults: '<div class="sffv_no-results">No matching brands.</div>'
        }
      }
    })
  );

  search.addWidget(
      instantsearch.widgets.refinementList({
        container: '#categories-refinement',
        attributeName: 'categories',
        sortBy: ['isRefined', 'count:desc', 'name:asc'],
        limit: 10,
        operator: 'or',
        templates: {
          header: 'Categories'
        },
        searchForFacetValues: {
          placeholder: 'Search for categories',
          templates: {
            noResults: '<div class="sffv_no-results">No matching categories.</div>'
          }
        }
      })
    );

  search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#price-refinement',
    attributeName: 'price',
    templates: {
      header: 'Price'
    },
    tooltips: {
      format: function(rawValue) {
        return '$' + Math.round(rawValue).toLocaleString();
      }
    }
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: '#stats',
    templates: {
      body: '<div>You have {{nbHits}} results, fetched in {{processingTimeMS}}ms.</div>'
    }
  })
);

search.start();
