import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Link from '../src/Link';
import { Layout } from '../src/Layout';
import Head from 'next/head';

export default function Legal() {
  return (
    <Layout>
      <Head>
        <title>Terms of Use | Buccaneer</title>
      </Head>
      <Container
        disableGutters
        maxWidth="sm"
        sx={{ mt: 6 }}
      >
        <Card variant="outlined">
          <CardContent sx={{ p: '16px 28px!important', maxHeight: '80vh', overflowY: 'scroll' }}>
            {/* <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
            >
              Buccaneer V3 Terms of Use Agreement
            </Typography>
            <Typography>
              Important Notice: Please read this agreement carefully before signing in with your web3 wallet and using
              the Buccaneer V3 platform. By using our platform, you agree to the following terms and conditions:
            </Typography> */}
            <br />
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Key Terms
            </Typography>
            <br />
            Buccaneer V3 ("Platform"): A decentralized protocol that operates on the Ethereum blockchain, providing
            users with privacy-focused cryptocurrency transactions. The Platform enables the purchase and transfer of
            BUCC tokens and the ultimate conversion into Ethereum (ETH).
            <br />
            <br />
            BUCC Tokens ("Tokens"): The unique utility tokens of Buccaneer V3, which can be acquired through various
            decentralized exchanges (DEXs) and are used within the Platform for enabling private transactions.
            <br />
            <br />
            Ethereum (ETH): Referred to within the context of this Platform as a commodity and not as a fiat currency.
            ETH is the cryptocurrency with which users can ultimately transact after swapping BUCC Tokens, as per the
            Platform's intended utility.
            <br />
            <br />
            Private Transaction: A feature provided by the Platform allowing the sending of BUCC tokens to any Ethereum
            address with enhanced privacy. The Platform's technology ensures that these transactions do not involve
            pooling or mixing of assets, maintaining the individual's privacy.
            <br />
            <br />
            Service: For the purpose of these Terms, the term "Service" refers to the functionality offered by the
            Platform allowing users to conduct private transactions using BUCC Tokens. Buccaneer V3 does not operate as
            a traditional service provider, as it does not charge fees for the transfer of Tokens, nor does it profit
            from the private transactions conducted by its users.
            <br />
            <br />
            Tumbler/Mixer: Buccaneer V3 is not a tumbler or mixer service. It does not amalgamate or mix cryptocurrency
            funds with other users' assets as part of its operations. The Platform's primary focus is on the privacy,
            protection, and security of individual users' transactions without engaging in asset mixing.
            <br />
            <br />
            Utility: The Platform's operations are based on the utility of the BUCC Tokens, which are designed to
            facilitate private transactions within the Ethereum blockchain ecosystem. The sale of BUCC Tokens is not
            considered the sale of a service, but rather the provision of a utility for enabling private transactions.
            <br />
            <br />
            No Fiat Transfer: The Platform does not support or facilitate the transfer of fiat currency. All
            transactions on the Platform are conducted using BUCC Tokens and ETH.
            <br />
            <br />
            No Continual Revenue: Buccaneer V3 does not generate continuous revenue from private transactions conducted
            by its users. The Platform's economic model is based on the initial sale of BUCC Tokens and not on
            transaction fees or recurring revenue streams.
            <br />
            <br />
            <br />
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Service Limitations and Legal Disclaimers
            </Typography>
            <br />
            Service Provision: Buccaneer V3 does not offer traditional services nor does it charge money for service
            provision. The Buccaneer team's role is limited to developing static frontends for interaction with the
            Ethereum blockchain. Given that Buccaneer V3 operates entirely on-chain, all components of the platform are
            maintainable and operable by the users themselves.
            <br />
            <br />
            Corporate Structure: Buccaneer V3 is not recognized as an active company or corporation due to the finite
            sale of tokens and its operational structure. It is a decentralized platform with limited governance by its
            creators.
            <br />
            <br />
            Legal and Financial Advice: The Buccaneer team does not provide legal or financial advice. Users are advised
            to seek independent legal counsel to understand the risks associated with the use of cryptocurrencies and to
            ensure compliance with all applicable laws and regulations.
            <br />
            <br />
            Liability: Users agree to assume all risks associated with the use of Buccaneer V3 tokens. Neither the
            Buccaneer team nor any advertising service through which Buccaneer is discovered shall be held liable for
            any damages or losses incurred.
            <br />
            <br />
            Partnerships and Approvals: The Buccaneer team neither forms partnerships with other entities nor approves
            or disapproves of other tokens. The presence of Buccaneer on any advertising service does not imply
            endorsement by that service.
            <br />
            <br />
            User Responsibility: Users are responsible for researching and complying with relevant laws, including those
            concerning cryptocurrency, private currencies, anti-money laundering, and taxation.
            <br />
            <br />
            Jurisdictional Use: The platform is not recommended for use by citizens of the United States or any country
            subject to Office of Foreign Assets Control (OFAC) regulations due to the complex legal risks associated.
            <br />
            <br />
            Decentralization Commitment: Buccaneer's team is committed to creating and updating the Buccaneer token to
            achieve complete decentralization. The sale of tokens is intended for personal profit and to promote further
            decentralization.
            <br />
            <br />
            Hosting and Distribution: The static frontend for Buccaneer V3 is hosted under a long-term contract and is
            in the process of being transitioned to decentralized hosting solutions such as IPFS and distributable local
            host applications.
            <br />
            <br />
            Expectation of Service: Interaction with the Buccaneer token does not entitle users to any support or
            service from the Buccaneer team. All interactions are at the user's own risk.
            <br />
            <br />
            Excluded Users: Political figures, institutional representatives, criminals, money launderers, or sanctioned
            individuals are discouraged from using Buccaneer V3. While the team cannot prevent usage due to the
            decentralized nature of the platform, such use is expressly prohibited.
            <br />
            <br />
            using the platform, which requires a private key associated with a public key, constitutes a user's digital
            signature, indicating their understanding, mental capacity, and full acceptance of these terms. Users affirm
            that they are cognizant of these terms and consent to them by engaging with the platform.
            <br />
            <br />
            <br />
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              User Responsibilities and Obligations:
            </Typography>
            <br />
            a. Self-education: Users are responsible for educating themselves on how to use the Buccaneer V3 platform by
            utilizing the provided user manual. In the absence of a manual, users should refrain from using the platform
            unless they have experience with similar platforms.
            <br />
            <br />
            b. URL Verification: It is the user's responsibility to ensure they are accessing the platform through the
            correct URL and to protect themselves against phishing attempts.
            <br />
            <br />
            c. Scam Vigilance: Users must be vigilant against scam groups that may attempt to impersonate Buccaneer for
            fraudulent purposes. Users are responsible for verifying the authenticity of the platform they are
            interacting with.
            <br />
            <br />
            d. Transaction Verification: Users must exercise due diligence when sending tokens to ensure they are not
            transacting with sanctioned addresses, users, or engaging in illicit activities.
            <br />
            <br />
            e. Privacy and Anonymity: Buccaneer V3, as a static hosting service, does not retain records or logs of user
            activity. The Buccaneer team is committed to resisting any demands for such records.
            <br />
            <br />
            f. Community Interaction: Users who seek information or assistance from the community must acknowledge that
            community members are not liable for losses and are not authorized to provide legal advice.
            <br />
            <br />
            g. Jurisdiction: Buccaneer V3 operates without claiming jurisdiction from any particular nation and advises
            users to proceed with extreme caution when using the platform.
            <br />
            <br />
            h. Intended Use: Users are encouraged to use Buccaneer V3 strictly for privacy-enhancing purposes and not
            for any other activities.
            <br />
            <br />
            i. No Financial Advice: The Buccaneer V3 team does not offer financial advice or speculate on token prices.
            Any financial advice from community members is at the user's discretion and cannot be the basis for legal
            claims of damages.
            <br />
            <br />
            j. Community Participation: By participating in any community chat associated with Buccaneer V3, users are
            agreeing to these terms.
            <br />
            <br />
            k. No Endorsement of Ethereum: The Buccaneer V3 team does not endorse Ethereum or the decisions of its
            developers.
            <br />
            <br />
            l. Legal and Financial Responsibility: All legal, financial, and tax obligations and the burden of obtaining
            relevant information rest solely with the individual user utilizing the platform.
            <br />
            <br />
            <br />
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Data Collection and Handling
            </Typography>
            <br />
            Buccaneer V3 operates with a strict privacy policy rooted in the principle of non-collection of user data:
            <br />
            <br />
            No Data Collection: Buccaneer V3 does not collect, store, or have the capacity to collect any personal user
            data. This approach aligns with our core value of maintaining user privacy.
            <br />
            <br />
            Blockchain Transactions: Transactions that occur on the blockchain are public and can be viewed using
            blockchain explorers. However, Buccaneer V3 does not have a mechanism to hide the history of senders or
            transactions of other tokens; it merely facilitates enhanced privacy for transactions involving its own
            token.
            <br />
            <br />
            Technology Limitations: The current technological framework does not support logging, monitoring, or
            sanctioning users. Buccaneer V3 is not equipped with such capabilities and does not intend to develop them.
            <br />
            <br />
            Accessible Frontend: The frontend for Buccaneer V3 will remain fully accessible through peer-to-peer
            networks, emphasizing the decentralized nature of the service.
            <br />
            <br />
            No Charges for Platform Use: There will be no charges for using the platform, frontend, or token associated
            with Buccaneer V3.
            <br />
            <br />
            Public Blockchain Information: Any information that is recorded on the blockchain is inherently public and
            available to anyone who wishes to view it. Buccaneer V3 does not have control over, nor can it influence,
            the accessibility of data on the blockchain.
            <br />
            <br />
            By using Buccaneer V3, users acknowledge this privacy policy and understand that their interactions with the
            token and platform are subject to the inherent public nature of blockchain technology.
            <br />
            <br />
            <br />
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Intellectual Property Rights
            </Typography>
            <br />
            Buccaneer V3 adopts an open approach to intellectual property:
            <br />
            <br />
            No Patents: Buccaneer V3 will not seek patents for any technology, process, or product developed as part of
            the platform. The ethos of the platform is to remain open-source and patent-free.
            <br />
            <br />
            Use of Logos and Branding: Users and third parties are free to use Buccaneer V3 logos or branding. Buccaneer
            V3 imposes no restrictions on the use of its visual assets or brand representations.
            <br />
            <br />
            Legal Entity Status: Buccaneer V3 does not operate as a legally registered entity and therefore does not
            claim any intellectual property rights typically associated with such entities.
            <br />
            <br />
            Code Usage: All code made public by Buccaneer V3 is released for free use and is not encumbered by any
            licensing restrictions. This ensures that the code can be freely used, modified, and distributed by anyone.
            <br />
            <br />
            No Claims of Ownership: Buccaneer V3 does not claim ownership over the code once it is made public,
            acknowledging that it enters the public domain for community use and benefit.
            <br />
            <br />
            By interacting with Buccaneer V3, users accept that the platform does not offer protection of intellectual
            property in the conventional sense and that they are free to utilize and build upon the platform's code and
            branding in their own endeavors.
            <br />
            <br />
            <br />
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Disclaimers and Limitations of Liability
            </Typography>
            <br />
            External Control: Buccaneer V3 (BV3) acknowledges that it has no control over the actions or decisions of
            the Ethereum Foundation, nor any governmental or regulatory bodies. As such, users must recognize that the
            broader context in which BV3 operates is subject to external forces that may impact its functionality.
            <br />
            <br />
            Purpose and Privacy: BV3 is designed to provide privacy for transactions involving its own token. It does
            not claim to offer privacy solutions for Ethereum (ETH) or any other digital assets outside its scope. Users
            should not expect BV3 to provide privacy for any assets other than its own token.
            <br />
            <br />
            No Guarantees: The BV3 project does not claim to be infallible or 100% successful in its privacy efforts.
            Given the inherent uncertainties in technology and the fluid landscape of digital assets, it is impossible
            to assure complete privacy across all time.
            <br />
            <br />
            Sanction Risks: Users of BV3 acknowledge the risk of sanctions that may be imposed on individuals by various
            entities due to the use of privacy-focused platforms. BV3 does not offer protection or guarantees against
            such sanctions.
            <br />
            <br />
            Team Responsibility: The responsibilities of the Buccaneer team are limited to the creation and distribution
            of the BV3 token and the release of a decentralized frontend. The team is not responsible for the actions of
            users or the consequences of those actions.
            <br />
            <br />
            Decentralized Maintenance: The BV3 frontend is to be maintained in a decentralized manner. The Buccaneer
            team does not assume responsibility for ongoing centralized support or control, reinforcing the
            decentralized nature of the platform.
            <br />
            <br />
            limitations of liability. They enter into the use of BV3's services with the understanding that the team
            provides the tools for privacy but does not bear responsibility for the broader implications or individual
            user actions.
            <br />
            <br />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
