$(document).ready(function(){
    console.log("create a page list");
    createPage("page", "http://www.xxx.cn/getXXXs", 4, 20, "p", 9);
});

function createPage(
    _page_container_id,
    _page_request_url,
    _page_no,
    _page_size,
    _page_param_name,
    _list_half_size
    ){
    console.log("run the create page method");
    var _page_container = $("#" + _page_container_id);
    var _page_html = getPageHtml(_page_request_url, _page_no, _page_size, _page_param_name, _list_half_size);
    _page_container.html(_page_html);
};

function getPageHtml(
    _page_request_url,
    _page_no,
    _page_size,
    _page_param_name,
    _list_half_size
    ) {
    console.log("run the get page html method");

    if(_page_no < 1 || _page_size < 1 || _page_no > _page_size){
        return "分页参数配置有问题";
    }
    if(_list_half_size < 0) {
        _list_half_size = 0;
    }

    var _page_html = "<ul>";


    if(_page_no > 1) {
        _page_html += createPageItem(1, 'First', _page_request_url, _page_param_name, false);
        _page_html += createPageItem(_page_no - 1, 'Pre', _page_request_url, _page_param_name, false);
    }

    var _page_list_no = _page_no;
    for(var idx = _list_half_size; idx>=1; idx--) {
        _page_list_no = _page_no - idx;
        if(_page_list_no > 0) {
            _page_html += createPageItem(_page_list_no, _page_list_no, _page_request_url, _page_param_name, false);
        };
    }

    _page_html += createPageItem(_page_no, _page_no, _page_request_url, _page_param_name, true);

    for(var idx = 1; idx<=_list_half_size; idx++) {
        _page_list_no = _page_no + idx;
        if(_page_list_no <= _page_size) {
            _page_html += createPageItem(_page_list_no, _page_list_no, _page_request_url, _page_param_name, false);
        };
    }

    if(_page_no < _page_size) {
        _page_html += createPageItem(_page_no + 1, 'Next', _page_request_url, _page_param_name, false);
        _page_html += createPageItem(_page_size, 'Last', _page_request_url, _page_param_name, false);
    }

    _page_html += '<br style="clear:both;"/></ul>';
    return _page_html;
}

function createPageItem(
    _page_no,
    _page_item_text,
    _page_request_url,
    _page_param_name,
    _current_flag) {
    var _page_item_html = '<li';
    if(_current_flag) {
        _page_item_html += ' class="current_page"';
    }
    _page_item_html += '><a href="';
    _page_item_html += _page_request_url + '?' + _page_param_name + '=';
    _page_item_html += _page_no + '">' + _page_item_text + ' </a></li>';
    return _page_item_html;
}