import {Component, Input} from '@angular/core';
import {TreeviewData, TreeviewNode} from '../../../settings/pushNotification/models/treeviewData';
@Component({
    moduleId: module.id,
    selector: 'tree-view',
    templateUrl: 'treeview.component.html',
    directives: [TreeViewComponent]
})
export class TreeViewComponent {
    @Input() directories: TreeviewData = new TreeviewData();

    rootChecked() {
        this.directories.mainNodeChecked = !this.directories.mainNodeChecked;

        for (var index = 0; index < this.directories.nodes.length; index++) {
            this.directories.nodes[index].checked = this.directories.mainNodeChecked;
        }
    }

    childChecked(node: TreeviewNode) {
        node.checked = !node.checked;
        var childCount = 0; //this.directories.nodes.length;
        for (var index = 0; index < this.directories.nodes.length; index++) {
            if (this.directories.nodes[index].checked) {
                childCount = childCount + 1;
            }
        }

        if (+childCount === +this.directories.nodes.length) {
            this.directories.mainNodeChecked = true;
        } else {
            this.directories.mainNodeChecked = false;
        }
    }
}
