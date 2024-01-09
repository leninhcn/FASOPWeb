<template>
    <div style="height: 90vh;">
        <el-tree :data="menu" :props="defaultProps" @node-click="handleNodeClick" @node-contextmenu="showContextMenu"
            :highlight-current="true" default-expand-all :node-key="node => node.id" />
    </div>
    <div ref="myDiv" v-if="showMenu" id="myContextMenu" :style="{ left: `${menuX}px`, top: `${menuY}px` }">
        <ul>
            <li v-for="(option, index) in menuOptions" :key="index" @click="option.action"><i :class="option.icon"></i> {{
                option.label }}</li>
        </ul>
    </div>
    <el-dialog v-model="ShowEditMenu" :title="OpMode">
        <MenuEdit v-if="ShowEditMenu" :EditMode="OpMode.includes('Edit Menu')" :EdittingMenu="EdittingMenu"
            :ParentName="currentNodeParent[1]" @CompleteSuccess="FinishEdit"></MenuEdit>
    </el-dialog>

    <el-dialog v-model="deleteDialog" title="Warning" width="20%" align-center>
        <span>Delete this menu?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteDialog = false">Cancel</el-button>
                <el-button type="primary" @click="deleteMenu">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { Files, Tickets, Collection, Postcard, SetUp, DocumentChecked, DataBoard, DataAnalysis } from '@element-plus/icons-vue'
import MenuEdit from './MenuEdit.vue'
export default {
    components: {
        MenuEdit
    },
    methods: {
        handleClickOutside(event) {
            if (this.$refs.myDiv && !this.$refs.myDiv.contains(event.target)) {
                this.showMenu = false;
            }
        },
    
        handleNodeClick() {
            // console.log(node)
            // const element = document.querySelector(`[data-id="${data.id}"]`);
            // console.log(element)
            // if (element) {
            //     element.style.backgroundColor = 'yellow';
            // }
        },
        MenuToTree(parrent) {
            const temp = []; let child = undefined;
            parrent.forEach(element => {
                child = undefined;
                if (element.CHILDREN) child = this.MenuToTree(element.CHILDREN);
                temp.push({
                    label: element.NAME,
                    children: child
                });
            });
            return temp;
        },
        async getMenu() {
            await this.axios.get('api/FAOnlineSOP/GetMainMenu').then((res) => {
                this.menu = this.MenuToTree(res.data);
            }).catch((err) => {
                console.log(err.response.data);
            });
        },
        AddNewMenu() {
            this.EdittingMenu = undefined;
            this.showMenu = false;
            this.OpMode = 'Add New Menu'
            this.ShowEditMenu = true;
        },
        async edit() {
            await this.axios.post('api/FAOnlineSOP/GetEditMenu', this.currentNodeParent).then((res) => {
                this.EdittingMenu = res.data;
                this.showMenu = false;
                this.OpMode = 'Edit Menu'
                this.ShowEditMenu = true;
            }).catch((err) => {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.response.data
                });
                this.showMenu = false;
            });
        }, FinishEdit() {
            this.ShowEditMenu = false; location.reload();
        },
        delete() {
            this.showMenu = false
            this.deleteDialog = true
        },
        async deleteMenu() {
            await this.axios.post('api/FAOnlineSOP/DeleteMenu', this.currentNodeParent).then((res) => {
                this.$message({
                    showClose: true,
                    type: "success",
                    message: res.data,
                });
                this.deleteDialog = false;
                location.reload();
            }).catch((err) => {
                this.$message({
                    showClose: true,
                    type: "error",
                    message: err.response.data
                });
                this.deleteDialog = false;
                location.reload();
            });
        },
        showContextMenu(event, onode, dd) {
            this.currentNodeParent = [dd.label];
            let node = undefined;
            do {
                if (!node) node = dd.parent; else node = node.parent;
                if (node && node.label) this.currentNodeParent.push(node.label)
            } while (node)
            this.menuX = event.clientX;
            this.menuY = event.clientY;
            this.showMenu = true;
        }
    },
    data() {
        return {
            EdittingMenu: undefined,
            deleteDialog: false,
            currentNodeParent: [],
            OpMode: 'Add New Menu',
            ShowEditMenu: false,
            icons: [Files, Tickets, Collection, Postcard, SetUp, DocumentChecked, DataBoard, DataAnalysis],
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            menu: [],
            menuOptions: [
                { label: 'Add New', action: this.AddNewMenu, icon: 'fa-solid fa-square-plus' },
                { label: 'Edit', action: this.edit, icon: 'fa-solid fa-screwdriver-wrench' },
                { label: 'Delete', action: this.delete, icon: 'fa-solid fa-trash-can' }
            ],
            showMenu: false,
            menuX: 0,
            menuY: 0
        }
    }, mounted() {
        this.getMenu();
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
}
</script>

<style lang="scss" scoped>
#myContextMenu {
    position: absolute;
    background-color: white;
    z-index: 999;
    padding: 0;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);

    ul {
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        list-style-type: none;

        li {
            cursor: pointer;
            text-align: left;
        }

        li:hover {
            color: rgb(116, 39, 39);
        }
    }
}

.current_background {
    background-color: blue;
}
</style>