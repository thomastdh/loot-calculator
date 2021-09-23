<template>
  <div class="md:mt-8 ">
    <div class="relative text-white bg-gray-700 border-t-4 border-green-700 bg-opacity-40">
      <div class="p-4 bg-gray-900">
        <h1 class="text-2xl text-white">Changelogs</h1>
      </div>
      <div class="p-4 mb-1 space-y-4 text-white bg-black bg-opacity-90">
        <div class="">
          <div>
            <h3 class="pl-4 mb-4 text-lg uppercase border-l-4 border-green-500">Beginning of time</h3>
            <p>
              Greetings Capsuleers!
            </p>
            <p>
              This tool has now been updated by Nexus, Many thank to the original creator (Chapelini), Axol, Frough and Exekiel for helping me figure this out and providing data.
            </p>
          </div>
          <div>
            <h3 class="pl-4 mb-4 text-lg uppercase border-l-4 border-green-500">12 Feb 2021</h3>
            <ul class="pl-4 mb-6 text-white list-disc">
              <li>
                <div class="flex flex-wrap items-center">
                  Removed 'Small' prefix on some blueprints to match in-game item names.
                </div>
              </li>
              <li>
                Removed all <strong class="underline">manufactured</strong> rigs from search dropdown (blueprints are obviously still available to search).
              </li>
              <li class="">
                <div class="flex flex-wrap items-center">
                  Removed 'Remote' prefix from
                  <div class="inline-flex items-center">
                    <item-image size="xs" :item="{
                      'id': '61708020002',
                      'text': 'Repair Augmentor I Blueprint',
                  }" />
                    <div>Repair Augmentor Blueprints</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="pl-4 mb-4 text-lg uppercase border-l-4 border-green-500">4 Feb 2021</h3>
            <ul class="pl-4 mb-6 text-white list-disc">
              <li class="">
                <div class="flex flex-wrap items-center">
                  Added missing
                  <div class="inline-flex items-center">
                    <item-image size="xs" :item="{
                      'id': '61026000006',
                      'text': 'MK5 Interdiction Sphere Launcher Blueprint',
                  }" />
                    <div>Interdiction Bubble Blueprint</div>
                  </div>
                  &nbsp; and <div class="inline-flex items-center">
                    <item-image size="xs" :item="{
        'id': '61116000006',
        'text': 'MK5 Warp Disruption Field Generator Blueprint',
    }" />
                    <div>Warp Disruption Generator Blueprint</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="pl-4 mb-4 text-lg uppercase border-l-4 border-green-500">15 Jan 2021</h3>
            <ul class="pl-4 mb-6 text-white list-disc">
              <li>
                New API Provider selector to change where market price data are retrieved from. You can now select Trimark Market API which is preferred as it provides more up-to-date pricing information. Your preferred API will also be stored locally for your future sessions.
              </li>
              <li>
                When selecting Trimark API, you will be prompted to enter your API key; you may find this in the Trimark App. Your API key is never stored on the server, and lives only on your browser.
              </li>
            </ul>
          </div>
          <div>
            <h3 class="pl-4 mb-4 text-lg uppercase border-l-4 border-green-500">Beginning of time</h3>
            <p>
              Greetings Capsuleers!
            </p>
            <p>
              This tool has been provided to ease the painful, time-consuming process of loot distribution and get you back in the game for more PvE actions. To get some help if you do encounter issues or willing to provide feedbacks, reach out in Trimark's Discord where friendlies will be able to offer support.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemImage from "./../components/ItemImage.vue";
export default {
  components: {
    ItemImage,
  },
  mounted () {
    this.$store.commit('setSessionChangelogRead')
  }
}
</script>

<style>

</style>
