import test from 'ava'
import prettifyHtml from './'

test('prettify-html makes the html pretty', t => {
  const INPUT = `
	<div class="dt-m dt-l ph2 pv4 pv5-l w-100 white bg-aqua-gradient">
    <div class="dn dtc-m dtc-l v-mid pa3 w-50">
      <div class="pa3 ph4-m ph5-l"><img src="/assets/site/v2/letter.png" class="w-100" /></div>
    </div>





    <div class="dtc-m dtc-l v-mid w-100 w-50-m w-50-l ph4 pb4">
      <h1 class="fw6 mt0">Enrichment</h1>
      <div class="pb3 pb4-m pb4-l">
        <h2 class="fw3 lh-copy f5 w-100 w-80-m w-60-l pv3">
          Turn any email or domain into a full person or company profile to qualify leads.
        </h2>
      </div>
      <div class="cf">
        <a class="ph5 bg-white ph3 pv3-5 no-underline grow br2 fw6 f6 ttu tracked tc big-dark-box-shadow blue"
          href="#" title="Sign Up">Sign Up</a>
      </div>
    </div>
  </div>
  `

  const EXPECTED = `<div class="dt-m dt-l ph2 pv4 pv5-l w-100 white bg-aqua-gradient">
	<div class="dn dtc-m dtc-l v-mid pa3 w-50">
		<div class="pa3 ph4-m ph5-l">
			<img src="/assets/site/v2/letter.png" class="w-100" />
		</div>
	</div>
	<div class="dtc-m dtc-l v-mid w-100 w-50-m w-50-l ph4 pb4">
		<h1 class="fw6 mt0">
			Enrichment
		</h1>
		<div class="pb3 pb4-m pb4-l">
			<h2 class="fw3 lh-copy f5 w-100 w-80-m w-60-l pv3">
				Turn any email or domain into a full person or company profile to qualify leads.
			</h2>
		</div>
		<div class="cf">
			<a class="ph5 bg-white ph3 pv3-5 no-underline grow br2 fw6 f6 ttu tracked tc big-dark-box-shadow blue" href="#" title="Sign Up">Sign Up</a>
		</div>
	</div>
</div>
`

	const results = prettifyHtml(INPUT)

	t.is(results, EXPECTED)
})
