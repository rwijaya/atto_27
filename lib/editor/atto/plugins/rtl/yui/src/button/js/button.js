// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor rtl plugin.
 *
 * @package    editor-atto
 * @copyright  2014 Jerome Mouneyrac
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.atto_rtl = M.atto_rtl || {
    init : function(params) {
        var click = function(e, elementid) {
            e.preventDefault();
            if (!M.editor_atto.is_active(elementid)) {
                M.editor_atto.focus(elementid);
            }

            M.atto_rtl.selection = M.editor_atto.get_selection();
            if (M.atto_rtl.selection !== false && (!M.atto_rtl.selection.collapsed)) {
                console.log('+++++++++++++++++++++++++++++++++');
                console.log(window.getSelection());
                //var parentnode = Y.one(M.editor_atto.get_selection_parent_node());
                var parentnode = M.editor_atto.get_selection_parent_node();
                var parentnodeelement = parentnode.parentNode;

                console.log(parentnode);
                console.log(parentnodeelement);


                // If the parent tag is the contenteditable div, then create new div.
                var contenteditable = parentnodeelement.getAttribute("contenteditable");
                console.log(contenteditable);
                if (contenteditable === 'true') {
                    console.log('Yo I found the contenteditable tag');
                    var selection = M.editor_atto.get_selection_text();
                    var selectionnode = Y.one(selection);
                    var wrappedContent = '<div>' + parentnode.data + '</div>';
                    Y.one(parentnodeelement).setHTML(wrappedContent);

                    // Reset the variable.var parentnode = M.editor_atto.get_selection_parent_node();
                    parentnodeelement = M.editor_atto.get_selection_parent_node().childNodes[0];
                    //parentnodeelement = parentnode.parentNode;
                    //debugger;
                }
                //console.log(parentnode);
                console.log(parentnodeelement);

                var rtlattribut = parentnodeelement.getAttribute("dir");
                if (rtlattribut === "rtl") {
                    parentnodeelement.removeAttribute("dir");
                    Y.DOM.removeClass(parentnodeelement, "editor_atto_rtl");
                } else {
                    parentnodeelement.setAttribute("dir", "rtl");
                    Y.DOM.addClass(parentnodeelement, "editor_atto_rtl");
                }
            }

            // Clean the YUI ids from the HTML.
            M.editor_atto.text_updated(elementid);
        };

        var iconurl = M.util.image_url('e/right_to_left', 'core');
        M.editor_atto.add_toolbar_button(params.elementid, 'rtl', iconurl, params.group, click);
    }
};
