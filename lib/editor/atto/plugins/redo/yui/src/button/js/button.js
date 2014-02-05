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
 * Atto text editor redo plugin.
 *
 * @package    editor-redo
 * @copyright  2014 Jerome Mouneyrac
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
M.atto_redo = M.atto_redo || {
    init : function(params) {
        var click = function(e, elementid) {
            e.preventDefault();
            if (!M.editor_atto.is_active(elementid)) {
                M.editor_atto.focus(elementid);
            }
            document.execCommand('redo', false);
            // Clean the YUI ids from the HTML.
            M.editor_atto.text_updated(elementid);
        };

        // Creating a temp div to test if the browser support the redo execCommand.
        var redosupport = false;
        var foo = Y.Node.create('<div id="attoredotesting" contenteditable="true" style="height:1px">a</div>');
        Y.one('body').append(foo);
        foo.focus();
        document.execCommand('insertText', false, 'b');
        if (foo.getHTML() === 'ba') {
            document.execCommand('undo', false);
            if (foo.getHTML() === 'a') {
                document.execCommand('redo', false);
                if (foo.getHTML() === 'ba') {
                    redosupport = true;
                }
            }
        }
        Y.one('body').removeChild(foo);
        if (redosupport) {
            var iconurl = M.util.image_url('e/redo', 'core');
            M.editor_atto.add_toolbar_button(params.elementid, 'redo', iconurl, params.group, click);
        }
    }
};
