<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Profile Section -->
      <div class="col-12 col-md-4">
        <q-card class="settings-card">
          <q-card-section>
            <div class="text-h6">Profile Settings</div>
            <div class="text-center q-mt-md">
              <q-avatar size="100px">
                <img :src="profileImage">
                <q-badge
                  floating
                  color="primary"
                  rounded
                  class="cursor-pointer"
                  style="padding: 8px"
                  @click="uploadImage"
                >
                  <q-icon name="edit" size="16px" />
                </q-badge>
              </q-avatar>
              <div class="text-h6 q-mt-md">{{ userData.name }}</div>
              <div class="text-caption text-grey">Member since {{ memberSince }}</div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="saveProfile" class="q-gutter-md">
              <q-input
                v-model="userData.name"
                label="Full Name"
                filled
                :rules="[val => !!val || 'Name is required']"
              />
              <q-input
                v-model="userData.email"
                label="Email"
                filled
                type="email"
                :rules="[val => !!val || 'Email is required']"
              />
              <q-input
                v-model="userData.phone"
                label="Phone"
                filled
                mask="(###) ###-####"
              />
              <q-btn
                type="submit"
                color="primary"
                label="Save Profile"
                class="full-width"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <!-- Allergy Profile -->
      <div class="col-12 col-md-8">
        <q-card class="settings-card">
          <q-card-section>
            <div class="text-h6">Allergy Profile</div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12">
                <div class="text-subtitle2">Known Allergies</div>
                <q-select
                  v-model="allergyProfile.allergies"
                  :options="allergyOptions"
                  multiple
                  use-chips
                  filled
                  label="Select your allergies"
                />
              </div>

              <div class="col-12">
                <div class="text-subtitle2">Severity Levels</div>
                <div
                  v-for="allergy in allergyProfile.allergies"
                  :key="allergy"
                  class="q-my-sm"
                >
                  <div class="row items-center">
                    <div class="col-4">{{ allergy }}</div>
                    <div class="col-8">
                      <q-slider
                        v-model="allergySeverity[allergy]"
                        :min="1"
                        :max="10"
                        label
                        markers
                        color="primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="text-subtitle2">Medications</div>
                <q-input
                  v-model="allergyProfile.medications"
                  filled
                  type="textarea"
                  label="List your current medications"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Notification Settings -->
        <q-card class="settings-card q-mt-md">
          <q-card-section>
            <div class="text-h6">Notification Settings</div>
            <div class="q-mt-md">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>High Risk Alerts</q-item-label>
                    <q-item-label caption>
                      Receive notifications when allergy risk is high
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.highRisk" color="primary" />
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Daily Reminders</q-item-label>
                    <q-item-label caption>
                      Get daily reminders to track your symptoms
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.dailyReminder" color="primary" />
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section>
                    <q-item-label>Weather Changes</q-item-label>
                    <q-item-label caption>
                      Alerts about significant weather changes
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle v-model="notifications.weatherChanges" color="primary" />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>

        <!-- Data Management -->
        <q-card class="settings-card q-mt-md">
          <q-card-section>
            <div class="text-h6">Data Management</div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-12 col-md-6">
                <q-btn
                  color="primary"
                  icon="cloud_download"
                  label="Export All Data"
                  class="full-width"
                  @click="exportAllData"
                />
              </div>
              <div class="col-12 col-md-6">
                <q-btn
                  color="negative"
                  icon="delete_forever"
                  label="Delete Account"
                  class="full-width"
                  @click="confirmDeleteAccount"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'SettingsPage',

  data() {
    return {
      userData: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567'
      },
      profileImage: 'https://cdn.quasar.dev/img/boy-avatar.png',
      memberSince: date.formatDate(Date.now(), 'MMMM YYYY'),
      allergyProfile: {
        allergies: ['Pollen', 'Dust'],
        medications: 'Antihistamine daily'
      },
      allergyOptions: [
        'Pollen',
        'Dust',
        'Mold',
        'Pet Dander',
        'Food Allergies'
      ],
      allergySeverity: {
        Pollen: 7,
        Dust: 5
      },
      notifications: {
        highRisk: true,
        dailyReminder: false,
        weatherChanges: true
      }
    }
  },

  methods: {
    uploadImage() {
      // Image upload logic
    },

    saveProfile() {
      this.$q.notify({
        color: 'positive',
        message: 'Profile updated successfully',
        icon: 'check'
      })
    },

    exportAllData() {
      this.$q.notify({
        color: 'positive',
        message: 'Data export started',
        icon: 'cloud_download'
      })
    },

    confirmDeleteAccount() {
      this.$q.dialog({
        title: 'Delete Account',
        message: 'Are you sure you want to delete your account? This action cannot be undone.',
        ok: {
          color: 'negative',
          label: 'Delete'
        },
        cancel: true,
        persistent: true
      }).onOk(() => {
        // Account deletion logic
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.settings-card {
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 8px 12px rgba(0,0,0,0.1);
  }
}

.q-avatar {
  .q-badge {
    padding: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style> 