import _root_.io.gatling.core.scenario.Simulation
import ch.qos.logback.classic.{Level, LoggerContext}
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import org.slf4j.LoggerFactory

import scala.concurrent.duration._

/**
 * Performance test for the CashBoxController entity.
 */
class CashBoxControllerCashBoxCustomerReceiptReceiptItemGatlingTest500 extends Simulation {

    val context: LoggerContext = LoggerFactory.getILoggerFactory.asInstanceOf[LoggerContext]
    // Log all HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("TRACE"))
    // Log failed HTTP requests
    //context.getLogger("io.gatling.http").setLevel(Level.valueOf("DEBUG"))

    val baseURL = Option(System.getProperty("baseURL")) getOrElse """http://localhost:8080"""

    val httpConf = http
        .baseURL(baseURL)
        .inferHtmlResources()
        .acceptHeader("*/*")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
        .connectionHeader("keep-alive")
        .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")

    val headers_http = Map(
        "Accept" -> """application/json"""
    )

    val headers_http_authenticated = Map(
        "Accept" -> """application/json""",
        "X-XSRF-TOKEN" -> "${xsrf_token}"
    )

    val keycloakHeaders = Map(
        "Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Upgrade-Insecure-Requests" -> "1"
    )

    val scn = scenario("Test the CashBoxController entity")
        .exec(http("First unauthenticated request")
        .get("/api/account")
        .headers(headers_http)
        .check(status.is(401))
        .check(headerRegex("Set-Cookie", "XSRF-TOKEN=(.*);[\\s]").saveAs("xsrf_token"))).exitHereIfFailed
        .pause(10)
        .exec(http("Authentication")
        .post("/api/authentication")
        .headers(headers_http_authenticated)
        .formParam("j_username", "admin")
        .formParam("j_password", "admin")
        .formParam("remember-me", "true")
        .formParam("submit", "Login")
        .check(headerRegex("Set-Cookie", "XSRF-TOKEN=(.*);[\\s]").saveAs("xsrf_token"))).exitHereIfFailed
        .pause(1)
        .exec(http("Authenticated request")
        .get("/api/account")
        .headers(headers_http_authenticated)
        .check(status.is(200)))
        .pause(10)
        .repeat(2) {
            exec(http("Get all cashBoxControllers")
            .get("/api/cash-box-controllers")
            .headers(headers_http_authenticated)
            .check(status.is(200)))
            .pause(10 seconds, 20 seconds)				
            .exec(http("Create new cashBoxController")
            .post("/api/cash-box-controllers")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_cashBoxController_url"))
						.check(jsonPath("$..id").find.saveAs("controller_id"))
						).exitHereIfFailed
            .exec(http("Create new cashBox")
            .post("/api/cash-boxes")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "model":"TEST1", "controller": {"id":"${controller_id}"}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_cashBox_url"))
						.check(jsonPath("$..id").find.saveAs("cashbox_id"))
						).exitHereIfFailed
            .exec(http("Create new customer")
            .post("/api/customers")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "firstName":"SAMPLE_TEXT", "lastName":"SAMPLE_TEXT", "address":"SAMPLE_TEXT"}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_customer_url"))
						.check(jsonPath("$..id").find.saveAs("customer_id"))
						).exitHereIfFailed
            .exec(http("Create new receipt")
            .post("/api/receipts")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "date":"2020-01-01T00:00:00.000Z", "paymentMode":"CASH", "runningTotal":"0", "cashBox": {"id":"${cashbox_id}", "model":"TEST1", "controller": {"id":"${controller_id}"}}, "customer": {"id":"${customer_id}", "firstName":"SAMPLE_TEXT", "lastName":"SAMPLE_TEXT", "address":"SAMPLE_TEXT"}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_receipt_url"))
						.check(jsonPath("$..id").find.saveAs("receipt_id"))
						).exitHereIfFailed
						.exec(http("Create new receiptItem")
            .post("/api/receipt-items")
            .headers(headers_http_authenticated)
            .body(StringBody("""{"id":null, "productBarCode":"0", "productPrice":"0", "productName":"SAMPLE_TEXT", "receipt": {"id":"${receipt_id}", "date":"2020-01-01T00:00:00.000Z", "paymentMode":"CASH", "runningTotal":"0", "cashBox": {"id":"${cashbox_id}", "model":"TEST1", "controller": {"id":"${controller_id}"}}, "customer": {"id":"${customer_id}", "firstName":"SAMPLE_TEXT", "lastName":"SAMPLE_TEXT", "address":"SAMPLE_TEXT"}}}""")).asJSON
            .check(status.is(201))
            .check(headerRegex("Location", "(.*)").saveAs("new_receiptItem_url"))).exitHereIfFailed
            .pause(10)
            .repeat(5) {
                exec(http("Get created receiptItem")
                .get("${new_receiptItem_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created receiptItem")
            .delete("${new_receiptItem_url}")
            .headers(headers_http_authenticated))						
            .pause(10)
            .repeat(5) {
                exec(http("Get created receipt")
                .get("${new_receipt_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created receipt")
            .delete("${new_receipt_url}")
            .headers(headers_http_authenticated))						
            .pause(10)
            .repeat(5) {
                exec(http("Get created customer")
                .get("${new_customer_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created customer")
            .delete("${new_customer_url}")
            .headers(headers_http_authenticated))
            .pause(10)						
            .repeat(5) {
                exec(http("Get created cashBox")
                .get("${new_cashBox_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created cashBox")
            .delete("${new_cashBox_url}")
            .headers(headers_http_authenticated))
            .pause(10)
            .repeat(5) {
                exec(http("Get created cashBoxController")
                .get("${new_cashBoxController_url}")
                .headers(headers_http_authenticated))
                .pause(10)
            }
            .exec(http("Delete created cashBoxController")
            .delete("${new_cashBoxController_url}")
            .headers(headers_http_authenticated))
            .pause(10)
        }

    val users = scenario("Users").exec(scn)

    setUp(
        users.inject(rampUsers(Integer.getInteger("users", 500)) over (Integer.getInteger("ramp", 1) minutes))
    ).protocols(httpConf)
}
