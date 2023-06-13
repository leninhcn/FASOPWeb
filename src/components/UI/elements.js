
import {
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElMessage,
  ElMessageBox,
  ElLoading,
  ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu, ElAside,
  ElMain,
  ElDropdown, ElDropdownItem, ElDropdownMenu,
  ElContainer,
  ElHeader, ElPageHeader,
  ElStep, ElSteps, ElCarousel, ElCarouselItem,
  ElTooltip, ElRow, ElFooter, ElUpload, ElIcon,
  ElPopconfirm, ElCol, ElSelectV2, ElDatePicker, ElTimePicker,
  ElCheckbox, ElRadio, ElRadioGroup, ElSwitch, ElTree, ElTreeSelect,
  ElImage, ElImageViewer, ElCollapse, ElCollapseItem, ElTabs, ElTabPane,
  ElScrollbar
} from "element-plus";

export default {
  install: (app) => {
    app.component(ElScrollbar.name, ElScrollbar);
    app.component(ElTabs.name, ElTabs);
    app.component(ElTabPane.name, ElTabPane);
    app.component(ElCollapse.name, ElCollapse);
    app.component(ElCollapseItem.name, ElCollapseItem);
    app.component(ElImage.name, ElImage);
    app.component(ElImageViewer.name, ElImageViewer);
    app.component(ElTreeSelect.name, ElTreeSelect);
    app.component(ElTree.name, ElTree);
    app.component(ElSwitch.name, ElSwitch);
    app.component(ElCheckbox.name, ElCheckbox);
    app.component(ElRadio.name, ElRadio);
    app.component(ElRadioGroup.name, ElRadioGroup);
    app.component(ElTimePicker.name, ElTimePicker);
    app.component(ElDatePicker.name, ElDatePicker);
    app.component(ElSelectV2.name, ElSelectV2);
    app.component(ElCol.name, ElCol);
    app.component(ElMenuItem.name, ElMenuItem);
    app.component(ElMenuItemGroup.name, ElMenuItemGroup);
    app.component(ElSubMenu.name, ElSubMenu);
    app.component(ElAside.name, ElAside);
    app.component(ElStep.name, ElStep);
    app.component(ElSteps.name, ElSteps);
    app.component(ElCarousel.name, ElCarousel);
    app.component(ElCarouselItem.name, ElCarouselItem);
    app.component(ElTooltip.name, ElTooltip);
    app.component(ElRow.name, ElRow);
    app.component(ElFooter.name, ElFooter);
    app.component(ElUpload.name, ElUpload);
    app.component(ElIcon.name, ElIcon);
    app.component(ElPopconfirm.name, ElPopconfirm);

    app.component(ElButton.name, ElButton);
    app.component(ElInput.name, ElInput);
    app.component(ElForm.name, ElForm);
    app.component(ElFormItem.name, ElFormItem);
    app.component(ElSelect.name, ElSelect);
    app.component(ElOption.name, ElOption);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
    app.component(ElPagination.name, ElPagination);
    app.component(ElDialog.name, ElDialog);
    app.component(ElMenu.name, ElMenu);
    app.component(ElMain.name, ElMain);
    app.component(ElDropdown.name, ElDropdown);
    app.component(ElDropdownItem.name, ElDropdownItem);
    app.component(ElDropdownMenu.name, ElDropdownMenu);
    app.component(ElContainer.name, ElContainer);
    app.component(ElHeader.name, ElHeader);
    app.component(ElPageHeader.name, ElPageHeader);

    app.config.globalProperties.$messageBox = ElMessageBox;
    app.config.globalProperties.$message = ElMessage;
    app.config.globalProperties.$Loading = ElLoading;
    app.provide('$message', ElMessage);
  },
};
