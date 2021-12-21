"use strict";

const Quote =  from; "./componentes/Quote";
const Spinner = from; "./consol.quotes/breakingbad/scripts/spinner.js";

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
        return;
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
                break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null)
                _i["return"]();
        } finally {
            if (_d)
                throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
        return arr;
}

var quote = document.getElementById('quote_id');
var initialQuote = {
    text: 'Quote',
    author: 'Author :)'
};
getQuoteByAuthor();

    function getQuoteByAuthor() {
    var _useState = _useState(initialQuote);
    _useState2 = _slicedToArray(_useState, 2);
    updateQuote = _useState2[0], 
    setQuote = _useState2[1];

    var updateQuote = function updateQuote() {
        var url, quote, res, _ref, _ref2, newQuote, _newQuote, text, author;

        return regeneratorRuntime.async(function updateQuote$(_context) {
    while (1) {
        switch (_context.prev = _context.next) {
        case 0:
            setLoading(true);
            url = "https://breakingbadapi.com/api/quotes?/series=Better+Call+Saul";
            _context.next = 4;
            return regeneratorRuntime.awrap(fetch(url));

        case 4:
            res = _context.sent;
            _context.next = 7;
            return regeneratorRuntime.awrap(res.json());

        case 7:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            newQuote = _ref2[0];
            fetch("https://breakingbadapi.com/api/quotes?/series=Better+Call+Saul").then(function(res) {
                return res.json();
            }).then(function(newQuote) {
                console.log(newQuote);
                showNewQuote(quote);
            });
            _newQuote = _newQuote,
            text = _newQuote.quote,
            author = _newQuote.author,
            setQuote({ 
                text: text,
                author: author,
            })
            setLoading(false);

            case 14:
            case "end":
                return _context.stop()}  

            react.useEffect(() => {
                updateQuote()
            },[]);

            return(

                <div class= "app">            
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"alt="logo">    
                </img>                
                <button onClick={() => updateQuote()}>Get Another</button>

                { loading ? <Spinner /> : <Quote quote={quote} /> };
                
                </div>
            )};
        
        }
    )}
}
