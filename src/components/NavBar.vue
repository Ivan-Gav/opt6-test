<template>
  <div class="navbox">
    <nav class="nav">
      <a
        @click.prevent="handleNavClick"
        class="navlink"
        :class="active === 'general' ? 'active' : ''"
        data-to="general"
        href=""
        >Общее</a
      >
      <a
        @click.prevent="handleNavClick"
        class="navlink"
        :class="active === 'catalog' ? 'active' : ''"
        data-to="catalog"
        href=""
        >Товары</a
      >
      <a
        @click.prevent="handleNavClick"
        class="navlink"
        :class="active === 'additional' ? 'active' : ''"
        data-to="additional"
        href=""
        >Доп.расходы</a
      >
    </nav>
    <button class="settings-btn" @click="handleSettingsClick" >
      <CogSVG />
    </button>
  </div>

    <SettingsMenu v-bind="contMenuParams" @close-context-menu="handleOutsideClick"/>

</template>

<script setup>
import { ref, reactive } from "vue";
import CogSVG from "./SVG/CogSVG.vue";
import SettingsMenu from "./SettingsMenu.vue";
import useSettingsMenu from "../composables/useSettingsMenu";

const active = ref("catalog");


const { contMenuParams,  handleOutsideClick, handleSettingsClick} = useSettingsMenu()

const handleNavClick = (e) => {
  active.value = e.target.dataset.to;
  // process nav click
};

</script>

<style scoped>
.navbox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
}

.nav {
  display: flex;
  gap: 20px;
}

.navlink {
  font-family: var(--font-semibold);
  font-size: 16px;
  color: var(--color-nav-link);
  transition: color 0.3s ease-in;
  text-decoration: none;
}

.navlink.active {
  color: var(--collor-main);
}

.navlink:last-child {
  margin-left: 5px;
}

.settings-btn {
  color: var(--color-controls-2);
  transition: color 0.3s ease-in;
}
</style>
