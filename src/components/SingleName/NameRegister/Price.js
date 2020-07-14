import React from 'react'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'
import mq from 'mediaQuery'
import EthVal from 'ethval'
import { InlineLoader } from 'components/Loader'

const PriceContainer = styled('div')`
  width: 100%;
  ${mq.medium`
    width: auto
  `}
`

const Value = styled('div')`
  font-family: Overpass;
  font-weight: 100;
  font-size: 22px;
  color: #2b2b2b;
  border-bottom: 1px solid #dbdbdb;
  ${mq.small`
    font-size: 28px;
  `}
`

const Description = styled('div')`
  font-family: Overpass;
  font-weight: 300;
  font-size: 14px;
  color: #adbbcd;
  margin-top: 10px;
`

const USD = styled('span')`
  font-size: 22px;
  color: #adbbcd;
  margin-left: 20px;
  ${mq.small`
    font-size: 28px;
  `}
`

const Price = ({
  loading,
  price,
  ethUsdPrice,
  ethUsdPremiumPrice,
  ethUsdPriceLoading,
  underPremium
}) => {
  const { t } = useTranslation()
  let ethPrice = <InlineLoader />
  let ethVal, basePrice
  if (!loading && price) {
    ethVal = new EthVal(`${price}`).toEth()
    ethPrice = ethVal.toFixed(3)
    if (ethUsdPrice && ethUsdPremiumPrice) {
      basePrice = ethVal.mul(ethUsdPrice) - ethUsdPremiumPrice
    }
  }
  const withPremium =
    underPremium && ethUsdPremiumPrice
      ? `$${basePrice.toFixed(0)}(+$${ethUsdPremiumPrice.toFixed(2)}) =`
      : null

  return (
    <PriceContainer>
      <Value>
        {ethPrice} ETH
        {!ethUsdPriceLoading && !loading && price && (
          <USD>
            {withPremium}${ethVal.mul(ethUsdPrice).toFixed(2)}
            USD
          </USD>
        )}
      </Value>
      <Description>
        {ethUsdPremiumPrice
          ? t('pricer.pricePerAmount')
          : t('pricer.totalPriceLabel')}
      </Description>
    </PriceContainer>
  )
}

export default Price
