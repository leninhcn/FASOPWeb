<template>
  <div
    style="
      position: relative;
      margin-top: 10px;
      border: solid 1px rgba(97, 96, 96, 0.808);
      border-radius: 10px;
    "
  >
    <q-input
      color="teal"
      borderless
      dense
      clearable
      v-model="txtSearch"
      label="Search"
      style="width: 75%; display: inline-block"
      debounce="500"
      @update:model-value="FilterFriendList"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <div style="display: inline-block; font-size: large">
      <q-icon
        @click="
          () => {
            ShowFilter = !ShowFilter;
            FilterApplied = true;
          }
        "
        name="filter_alt"
        style="margin-bottom: 10px; cursor: pointer"
        :color="FilterApplied ? 'deep-orange' : 'grey-6'"
      />
      <q-icon
        @click="
          () => {
            ShowSort = !ShowSort;
            SortApllied = true;
          }
        "
        name="sort"
        style="margin-bottom: 10px; cursor: pointer"
        :color="SortApllied ? 'deep-orange' : 'grey-6'"
      />
    </div>
    <div>
      <q-select
        v-if="ShowFilter"
        filled
        dense
        v-model="search"
        :options="SearchOptions"
        color="teal"
        options-selected-class="text-deep-orange"
        style="width: 100%"
        @update:model-value="SearchBySelect"
      >
        <template v-slot:prepend>
          <q-icon name="filter_alt" />
        </template>
      </q-select>
      <q-select
        v-if="ShowSort"
        filled
        dense
        v-model="sort"
        :options="Sorts"
        color="teal"
        options-selected-class="text-deep-orange"
        style="width: 100%"
        @update:model-value="SortReult"
      >
        <template v-slot:prepend>
          <q-icon name="sort" />
        </template>
      </q-select>
    </div>
  </div>
  <div>
    <q-list v-for="(emp, idx) in TempList" :key="idx">
      <q-item
        dense
        clickable
        v-ripple
        :active="emp.checked"
        @click="emp.checked = !emp.checked"
      >
        <q-menu
          style="z-index: 9999"
          touch-position
          context-menu
          ref="myMenu"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-list style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              @click="
                () => {
                  this.addUser = true;
                  this.NewChat = true;
                }
              "
            >
              <q-item-section avatar>
                <q-icon color="indigo-14" name="add_comment" />
              </q-item-section>
              <q-item-section style="margin-left: -25px"
                >New Chat</q-item-section
              >
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon color="red-13" name="clear_all" />
              </q-item-section>
              <q-item-section style="margin-left: -25px"
                >Clear History</q-item-section
              >
            </q-item>
            <q-item clickable v-close-popup @click="GroupDelete">
              <q-item-section avatar>
                <q-icon color="red-13" name="delete" />
              </q-item-section>
              <q-item-section style="margin-left: -25px"
                >Delete Group</q-item-section
              >
            </q-item>
          </q-list>
        </q-menu>
        <q-item-section avatar>
          <q-checkbox
            dense
            v-model="emp.checked"
            color="orange"
            checked-icon="radio_button_checked"
            indeterminate-icon="help"
            unchecked-icon="radio_button_unchecked"
          />
        </q-item-section>
        <q-item-section avatar>
          <q-avatar
            size="30px"
            style="padding: 0; margin-left: -20px; margin-right: 0"
          >
            <img
              :src="
                emp.AVATAR ? `data:image/png;base64,${emp.AVATAR}` : NoAvatar
              "
              alt=""
            />
          </q-avatar>
        </q-item-section>
        <q-item-section style="margin-left: -40px">
          <q-item-label style="font-size: small">
            {{ emp.EMP_NAME }}</q-item-label
          >
          <q-item-label caption style="font-size: x-small">
            {{ emp.EMP_NO }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    onMounted(() => {
      LoadDefaultImage();
      GetAllFriends();
    });
    const store = useStore();

    const LoginUser = store.getters.getUser;

    const FriendList = ref(null);
    const axios = inject("axios");
    const message = inject("$message");
    function GetAllFriends() {
      axios
        .get(`api/chatapp/EmpSearch?emp=all&avatar=True`)
        .then((res) => {
          FriendList.value = res.data
            .filter((item) => item.EMP_ID != LoginUser.EMP_ID)
            .map((obj) => {
              return { ...obj, checked: false };
            });
          TempList.value = FriendList.value;
          TempList.value.sort((a, b) =>
            a.EMP_NAME.toLowerCase().localeCompare(b.EMP_NAME.toLowerCase())
          );
          // console.log(TempList.value.filter((it) => it.EMP_NAME == "NinhLe"));
        })
        .catch((err) => {
          message({
            type: "error",
            message: err,
          });
        });
    }

    const NoAvatar = ref(null);
    const ShowFilter = ref(false),
      ShowSort = ref(false);

    function SortReult(val) {
      ShowSort.value = false;
      if (val.value == "a2z") {
        TempList.value.sort((a, b) =>
          a.EMP_NAME.toLowerCase().localeCompare(b.EMP_NAME.toLowerCase())
        );
      } else {
        TempList.value.sort((a, b) =>
          b.EMP_NAME.toLowerCase().localeCompare(a.EMP_NAME.toLowerCase())
        );
      }
    }

    async function LoadDefaultImage() {
      try {
        const response = await axios.get("Images/noImg.png", {
          responseType: "blob",
        });
        const reader = new FileReader();
        reader.readAsDataURL(response.data);

        reader.onloadend = () => {
          NoAvatar.value = reader.result;
        };
      } catch (error) {
        console.error(error);
      }
    }

    const TempList = ref(null);
    function EMP_filter(filter) {
      if (!filter) {
        TempList.value = FriendList.value;
      } else {
        if (search.value.value == "EmpName") {
          TempList.value = FriendList.value.filter((item) =>
            item.EMP_NAME.toLowerCase().includes(filter.toLowerCase())
          );
        } else {
          TempList.value = FriendList.value.filter((item) =>
            item.EMP_NO.toLowerCase().includes(filter.toLowerCase())
          );
        }
      }
    }
    const sort = ref({
      label: "A-Z",
      value: "a2z",
    });
    const Sorts = [
      {
        label: "A-Z",
        value: "a2z",
      },
      {
        label: "Z-A",
        value: "z2a",
      },
    ];
    function FilterFriendList(val) {
      EMP_filter(val);
    }
    const txtSearch = ref(null);
    const FilterApplied = ref(false),
      SortApllied = ref(false);
    function SearchBySelect() {
      ShowFilter.value = false;
      FilterFriendList(txtSearch.value);
    }
    const search = ref({
      label: "Emp Name",
      value: "EmpName",
    });
    return {
      LoginUser,
      SortApllied,
      FilterApplied,
      ShowFilter,
      ShowSort,
      txtSearch,
      SearchBySelect,
      FilterFriendList,
      SortReult,
      FriendList,
      GetAllFriends,
      EMP_filter,
      TempList,
      NoAvatar,
      Sorts,
      sort,
      SearchOptions: [
        {
          label: "Emp Name",
          value: "EmpName",
        },
        {
          label: "Emp No",
          value: "EmpNo",
        },
      ],
      search,
    };
  },
};
</script>

<style>
</style>