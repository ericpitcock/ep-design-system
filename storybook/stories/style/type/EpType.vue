<!-- eslint-disable vue/no-v-html -->
<template>
  <ep-container
    :style="{
      '--ep-container-max-width': '120rem',
      '--ep-container-padding': '0 3rem',
      '--ep-container-content-padding': '3rem 0 10rem 0',
      '--ep-container-bg-color': 'var(--interface-surface)',
      '--ep-container-border-width': '0.1rem',
      '--ep-container-overflow': 'auto'
    }"
    sticky-header
    calculate-height
    :calculate-height-offset="30"
  >
    <template #header>
      <ep-header style="background: var(--interface-surface);">
        <template #left>
          <ep-tabs
            :items="tabs"
            :active-tab-index="activeTab"
            @tab-click="handleClick"
          />
        </template>
        <template #right>
          <ep-button
            label="Google Fonts"
            href="https://fonts.google.com/specimen/Inter"
          />
        </template>
      </ep-header>
    </template>
    <template #default>
      <ep-tab-content
        :items="tabs"
        :active-tab-index="activeTab"
      >
        <template #tab-0>
          <div
            v-for="(typeStyle, index) in typeStyles"
            :key="index"
            class="type-style"
          >
            <div class="type-style__desc">
              <div class="font-size--body text-color--loud">
                {{ typeStyle.name }}
              </div>
              <template
                v-for="(item, indexx) in typeStyle.meta"
                :key="indexx"
              >
                <div class="meta font-size--small">
                  {{ item }}
                </div>
              </template>
            </div>
            <div class="type-style__sample">
              <div
                :class="`font-size--${typeStyle.name.toLowerCase()}`"
                v-html="typeStyle.sample"
              />
            </div>
          </div>
        </template>
        <template #tab-1>
          <div class="monospace">
            Fira Code info coming soon
          </div>
        </template>
      </ep-tab-content>
    </template>
  </ep-container>
</template>

<script>
  import { faker } from '@faker-js/faker'
  import EpButton from '@/components/button/EpButton.vue'
  import EpContainer from '@/components/container/EpContainer.vue'
  import EpHeader from '@/components/header/EpHeader.vue'
  import EpTabs from '@/components/tabs/EpTabs.vue'
  import EpTabContent from '@/components/tabs/EpTabContent.vue'

  export default {
    components: {
      EpButton,
      EpContainer,
      EpHeader,
      EpTabs,
      EpTabContent
    },
    data() {
      return {
        activeTab: 0,
        tabs: ['Inter Variable', 'Fira Code Variable'],
        typeStyles: [
          {
            name: 'Jumbo',
            // desc: 'Page headers',
            meta: [
              'font-size: 2.6rem (26px)',
              'font-weight: 300'
            ],
            sample: '<h1>Man walks on the moon</h1>'
          },
          {
            name: 'Large',
            // desc: 'headers',
            meta: [
              'font-size: 2rem (20px)',
              'font-weight: 300'
            ],
            sample: '<h2>Millions watch from around the world</h2>'
          },
          {
            name: 'Body',
            // desc: 'Blocks of text you expect people to read',
            meta: [
              'font-size: 1.5rem (15px)',
              'line-height: 2.4rem (24px)',
              'font-weight: 500',
              'max-width: 60rem (600px)'
            ],
            sample: `<div class="copy-block"><p>Used for larger copy blocks to provide a nice, comfortable reading experience. ${faker.lorem.sentences(6)}</p></div>`
          },
          {
            name: 'Default',
            // desc: 'Default UI text for ',
            meta: [
              'font-size: 1.3rem (13px)',
              'font-weight: 500'
            ],
            sample: '<div style="max-width: 350px; line-height: 1.4;">Default for most UI text strings, like tables and form fields. Also used for larger button and input variants.</div>'
          },
          {
            name: 'Small',
            // desc: 'For most UI controls and labels',
            meta: [
              'font-size: 1.2rem (12px)',
              'font-weight: 540'
            ],
            sample: 'UI controls and labels, like buttons and menu items'
          },
          {
            name: 'Tiny',
            // desc: 'Things should be there, but "not there"',
            meta: [
              'font-size: 1rem (10px)',
              'font-weight: 600'
            ],
            sample: '<p>Made in the USA</p>'
          },
        ]
      }
    },
    methods: {
      handleClick(index) {
        console.log('handleClick', index)
        this.activeTab = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ep-container + .ep-container {
    margin-top: 10px;
  }

  .type-style {
    display: flex;
    align-items: center;
    padding: 2.6rem 0 3rem;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &__desc {
      flex: 2;

      * + * {
        margin-top: 0.5rem;
      }

      .meta {
        color: var(--text-color--subtle);
      }
    }

    &__sample {
      flex: 6;
    }

    & + & {
      border-top: 1px solid var(--border-color);
    }
  }
</style>
